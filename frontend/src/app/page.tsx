"use client"

import { useAuth } from "./context/AuthContext"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  HomeIcon,
  BookOpen,
  PenTool,
  LogOut,
  LogIn,
  UserPlus,
  ArrowRight,
  Sparkles,
  Users,
  Edit3,
  Plus,
} from "lucide-react"

export default function Home() {
  const { user, token, logout } = useAuth()

  const testToken = async () => {
    if (!token) {
      console.log("No token available")
      return
    }

    try {
      const response = await axios.get("/auth/me")
      console.log("Token is valid, user data:", response.data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Token is invalid:", error.response.data || error.message)
      } else {
        console.log("Token is invalid:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center">
                <HomeIcon className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Simple Blog
              </h1>
            </div>

            <nav className="flex items-center space-x-6">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-full border border-violet-200">
                    <User className="w-4 h-4 text-violet-600" />
                    <span className="text-violet-700 font-medium">Welcome, {user.username}!</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button
                      asChild
                      variant="ghost"
                      className="text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors duration-200"
                    >
                      <Link href="/posts" className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>View Posts</span>
                      </Link>
                    </Button>

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
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 transition-colors duration-200"
                  >
                    <Link href="/login" className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-all duration-200 transform hover:scale-105"
                  >
                    <Link href="/signup" className="flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16 py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-violet-800 to-indigo-800 bg-clip-text text-transparent mb-6 leading-tight">
            Welcome to Simple Blog
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Share your thoughts and connect with others through the power of writing. Join our community of passionate
            storytellers.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105"
              >
                <Link href="/signup" className="flex items-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-violet-200 text-violet-700 hover:bg-violet-50 px-8 py-4 text-lg transition-all duration-200 bg-transparent"
              >
                <Link href="/login" className="flex items-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {user ? (
            <>
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      Read Posts
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    Discover stories and insights from our community of writers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-200 transform hover:scale-105"
                  >
                    <Link href="/posts" className="flex items-center justify-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Browse Posts</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Edit3 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                      Write a Post
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    Share your thoughts, experiences, and knowledge with the world.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-200 transform hover:scale-105"
                  >
                    <Link href="/create" className="flex items-center justify-center space-x-2">
                      <PenTool className="w-4 h-4" />
                      <span>Create Post</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-violet-600 transition-colors duration-200">
                      Join Our Community
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    Sign up to start reading and writing posts, and connect with other writers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white transition-all duration-200 transform hover:scale-105"
                  >
                    <Link href="/signup" className="flex items-center justify-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <LogIn className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors duration-200">
                      Already a Member?
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base">
                    Welcome back! Log in to access your posts and create new content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 bg-transparent"
                  >
                    <Link href="/login" className="flex items-center justify-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Simple Blog?</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy Writing</h4>
              <p className="text-gray-600">Simple, intuitive interface for creating beautiful posts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600">Connect with like-minded writers and readers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Discover</h4>
              <p className="text-gray-600">Find inspiring stories and fresh perspectives</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
