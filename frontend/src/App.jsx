import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuthState } from './hooks/useAuthState'
import Navbar from './components/Navbar'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { user, loading } = useAuthState()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Login />} />
        </Routes>
      </main>
      <PWAInstallPrompt />
    </div>
  )
}

export default App
