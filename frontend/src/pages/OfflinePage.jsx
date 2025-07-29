import React from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'

function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff size={48} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">You're offline</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          It looks like you've lost your internet connection. Don't worry, some features 
          may still work while you're offline.
        </p>
        <button
          onClick={handleRetry}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  )
}

export default OfflinePage
