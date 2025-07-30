from pydantic import BaseModel, EmailStr
from typing import Optional


class UserIn(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    username: str
    email: EmailStr

class UserDB(UserOut):
    hashed_password: str

# Blog post models - consistent field names
class BlogPostIn(BaseModel):
    title: str
    body: str  # Changed from content to body to match frontend

class BlogPostOut(BlogPostIn):
    id: str
    author: str  # username

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None  # Changed from content to body

# Legacy Post model for backward compatibility
class Post(BaseModel):
    title: str
    body: str
    author: str