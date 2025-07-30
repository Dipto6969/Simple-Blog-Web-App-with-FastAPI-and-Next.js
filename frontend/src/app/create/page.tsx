"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, PenTool, FileText, User, Home, BookOpen, LogIn, X } from "lucide-react"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { user, token } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm max-w-md w-full mx-4">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600 text-lg">You need to be logged in to create a post.</p>
            <Button
              asChild
              className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Link href="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login to Continue
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim() || !body.trim()) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      await axios.post("/posts", {
        title: title.trim(),
        body: body.trim(),
      })
      // Redirect to posts page after successful creation
      router.push("/posts")
    } catch (err: unknown) {
      let errorMessage = "Failed to create post"
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.detail || err.message || errorMessage
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
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
                <Link
                  href="/posts"
                  className="flex items-center space-x-2 text-gray-600 hover:text-violet-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-violet-50"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>All Posts</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Create New Post
              </CardTitle>
            </div>
            <p className="text-gray-600 text-lg">Share your thoughts with the world</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Post Title</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 text-lg border-gray-200 focus:border-violet-500 focus:ring-violet-500 transition-colors"
                  placeholder="Enter your post title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <PenTool className="w-4 h-4" />
                  <span>Post Content</span>
                </Label>
                <Textarea
                  id="body"
                  name="body"
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={12}
                  className="text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500 transition-colors resize-vertical"
                  placeholder="Write your post content here..."
                />
                <p className="text-sm text-gray-500 flex items-center space-x-1">
                  <span>Tip: Use markdown formatting for rich text</span>
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="px-6 py-2 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors bg-transparent"
                >
                  <Link href="/posts" className="flex items-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </Link>
                </Button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <PenTool className="w-4 h-4 mr-2" />
                      Publish Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
