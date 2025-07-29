import React, { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install button
      setShowInstallPrompt(true)
    }

    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    // Clear the deferredPrompt variable
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <h3 className="font-semibold text-gray-900">Install App</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Install Gemastik PWA on your device for a better experience!
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Download size={16} />
          <span>Install</span>
        </button>
        <button
          onClick={handleDismiss}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Not now
        </button>
      </div>
    </div>
  )
}

export default PWAInstallPrompt
