from fastapi import APIRouter, Depends, HTTPException, status
from .models import BlogPostIn, BlogPostOut, BlogPostUpdate
from .database import db, get_db
from .auth import get_current_user
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
import httpx
from typing import List

router = APIRouter()

# Get All Posts (NOW REQUIRES AUTHENTICATION as per docs)
@router.get("/posts", response_model=list[BlogPostOut])
async def get_posts(user: dict = Depends(get_current_user)):
    posts = []
    
    # First, get posts from database
    async for post in db["posts"].find():
        post["id"] = str(post["_id"])
        if isinstance(post.get("author"), dict) and "username" in post["author"]:
            post["author"] = post["author"]["username"]
        if not isinstance(post.get("author"), str):
            continue
        try:
            posts.append(BlogPostOut(**post))
        except Exception:
            continue
    
    # If no posts in database, fetch sample data from JSONPlaceholder
    if not posts:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get("https://jsonplaceholder.typicode.com/posts")
                if response.status_code == 200:
                    json_posts = response.json()
                    # Convert JSONPlaceholder format to our format
                    for json_post in json_posts[:10]:  # Limit to first 10 posts
                        sample_post = BlogPostOut(
                            id=str(json_post["id"]),
                            title=json_post["title"],
                            body=json_post["body"],
                            author="sample_user"
                        )
                        posts.append(sample_post)
        except Exception as e:
            print(f"Failed to fetch sample posts: {e}")
    
    return posts

# Create Post
@router.post("/posts", response_model=BlogPostOut)
async def create_post(post: BlogPostIn, user: dict = Depends(get_current_user)):
    username = user["username"] if isinstance(user, dict) and "username" in user else str(user)
    new_post = {
        "title": post.title,
        "body": post.body,
        "author": username
    }
    result = await db["posts"].insert_one(new_post)
    return BlogPostOut(id=str(result.inserted_id), **new_post)

# Update Post
@router.put("/posts/{post_id}", response_model=BlogPostOut)
async def update_post(post_id: str, update: BlogPostUpdate, user: dict = Depends(get_current_user)):
    post = await db["posts"].find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    username = user["username"] if isinstance(user, dict) and "username" in user else str(user)
    if post["author"] != username:
        raise HTTPException(status_code=403, detail="Unauthorized")

    updates = {k: v for k, v in update.dict().items() if v is not None}
    await db["posts"].update_one({"_id": ObjectId(post_id)}, {"$set": updates})
    post.update(updates)
    return BlogPostOut(id=str(post["_id"]), **post)

# Delete Post
@router.delete("/posts/{post_id}")
async def delete_post(
    post_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    try:
        post_id_cleaned = post_id.strip("{}")
        post = await db["posts"].find_one({"_id": ObjectId(post_id_cleaned)})
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")

        username = user["username"] if isinstance(user, dict) and "username" in user else str(user)
        if post.get("author") != username:
            raise HTTPException(status_code=403, detail="You are not allowed to delete this post")

        await db["posts"].delete_one({"_id": ObjectId(post_id_cleaned)})
        return {"message": "Post deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))