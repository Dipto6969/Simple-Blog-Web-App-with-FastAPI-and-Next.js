from pydantic import BaseModel
from typing import Optional

class Post(BaseModel):
    title: str
    content: str

class PostOut(Post):
    id: str
    author_email: str

class BlogPostIn(BaseModel):
    title: str
    content: str

class BlogPostOut(BlogPostIn):
    id: str
    author: str  # username

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None