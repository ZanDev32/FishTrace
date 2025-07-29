import React from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, Zap, Shield, Globe } from 'lucide-react'

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to Gemastik PWA
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern Progressive Web App built with React, Supabase, and Tailwind CSS.
          Fast, reliable, and works offline.
        </p>
        <div className="space-x-4">
          <Link to="/login" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
          <a
            href="#features"
            className="btn-secondary text-lg px-8 py-3"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our PWA?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="text-primary-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
            <p className="text-gray-600">
              Designed for mobile devices with responsive design and touch-friendly interface.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="text-primary-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Built with modern technologies for optimal performance and speed.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">
              Authentication and data security powered by Supabase.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="text-primary-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
            <p className="text-gray-600">
              Service worker ensures the app works even when you're offline.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users who are already using our PWA.
        </p>
        <Link
          to="/login"
          className="bg-white text-primary-500 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  )
}

export default Home
