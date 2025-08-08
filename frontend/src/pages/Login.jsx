import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp, signInWithGoogle } from '../lib/supabase'
import { Mail, Lock, User, AlertCircle } from 'lucide-react'

function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) throw error
        alert('Check your email for the confirmation link!')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        navigate('/dashboard')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
      // For OAuth, user will be redirected by Supabase. As a fallback:
      // navigate('/dashboard')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSignUp 
              ? 'Sign up to get started with Gemastik PWA'
              : 'Sign in to your account'
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Simple Google icon with SVG to avoid external deps */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.826 31.91 29.274 35 24 35 16.82 35 11 29.18 11 22S16.82 9 24 9c3.31 0 6.313 1.235 8.594 3.257l5.657-5.657C34.759 3.04 29.64 1 24 1 10.745 1 0 11.745 0 25s10.745 24 24 24 24-10.745 24-24c0-1.627-.17-3.217-.389-4.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.41 15.246 18.85 12 24 12c3.31 0 6.313 1.235 8.594 3.257l5.657-5.657C34.759 3.04 29.64 1 24 1 14.622 1 6.599 6.337 2.689 14.004l3.617.687z"/>
            <path fill="#4CAF50" d="M24 49c5.167 0 9.86-1.977 13.43-5.197l-6.2-5.238C29.017 40.404 26.646 41 24 41c-5.243 0-9.737-3.34-11.356-8.003l-6.49 5.002C9.018 44.556 16.017 49 24 49z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.37 3.827-4.808 6.818-9.303 6.818-5.243 0-9.737-3.34-11.356-8.003l-6.49 5.002C9.018 44.556 16.017 49 24 49c13.255 0 24-10.745 24-24 0-1.627-.17-3.217-.389-4.917z"/>
          </svg>
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(() => {
              if (loading) return 'Processing...';
              return isSignUp ? 'Create Account' : 'Sign In';
            })()}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
