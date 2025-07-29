import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../lib/supabase'
import { User, LogOut, Home, BarChart3 } from 'lucide-react'

function Navbar({ user }) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Gemastik PWA</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-500 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-500 transition-colors"
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-500 transition-colors"
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
Navbar.propTypes = {
  user: PropTypes.object
}

export default Navbar
