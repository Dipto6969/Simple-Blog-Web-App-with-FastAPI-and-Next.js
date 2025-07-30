"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Home, PenTool, LogOut, BookOpen, RefreshCw, FileText, Plus, AlertCircle } from "lucide-react"

interface Post {
  id: string
  title: string
  body: string
  author: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const { user, token, logout, isLoading: authLoading } = useAuth()
  const router = useRouter()

  // Wait for auth to load before redirecting
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user && token && !authLoading) {
      fetchPosts()
    }
  }, [user, token, authLoading])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/posts")
      setPosts(response.data)
      setError("")
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          logout()
          router.push("/login")
          return
        }
      }

      let errorMessage = "Failed to load posts"
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.detail || err.message || "Failed to load posts"
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
              <p className="text-lg text-gray-700">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
              <p className="text-lg text-gray-700">Redirecting to login...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-indigo-700 transition-all duration-200"
            >
              Simple Blog
            </Link>

            <nav className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-full border border-violet-200">
                <User className="w-4 h-4 text-violet-600" />
                <span className="text-violet-700 font-medium">Welcome, {user.username}!</span>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-violet-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-violet-50"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-200 transform hover:scale-105"
                >
                  <Link href="/create" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Post</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    All Posts
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Discover stories, thinking, and expertise from writers on any topic.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchPosts}
                className="ml-4 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
                <p className="text-lg text-gray-700">Loading posts...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && !error && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">Be the first to share your thoughts with the community.</p>
              <Button
                asChild
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-all duration-200 transform hover:scale-105"
              >
                <Link href="/create" className="flex items-center space-x-2">
                  <PenTool className="w-4 h-4" />
                  <span>Create the First Post</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 line-clamp-3 text-sm leading-relaxed">{post.body}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">
                        By <span className="font-medium text-gray-900">{post.author}</span>
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      Read more
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
