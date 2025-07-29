import React, { useState, useEffect } from 'react'
import { BarChart3, Users, TrendingUp, Activity } from 'lucide-react'

function Dashboard() {
  const [stats] = useState({
    totalUsers: 1234,
    activeToday: 89,
    growth: '+12%',
    tasks: 23
  })

  useEffect(() => {
    // In a real app, you would fetch data from Supabase here
    // For demo purposes, we'll use static data
  }, [])

  // Helper functions for activity styling
  const getActivityBgColor = (type) => {
    switch (type) {
      case 'user': return 'bg-blue-100'
      case 'export': return 'bg-green-100'
      case 'system': return 'bg-purple-100'
      default: return 'bg-gray-100'
    }
  }

  const getActivityTextColor = (type) => {
    switch (type) {
      case 'user': return 'text-blue-600'
      case 'export': return 'text-green-600'
      case 'system': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="btn-primary">
          Add New Item
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-bold text-gray-900">{stats.growth}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.tasks}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Chart visualization would go here</p>
            <p className="text-sm text-gray-400">Connect to your data source to see real analytics</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { id: 'activity-1', action: 'New user registered', time: '2 minutes ago', type: 'user' },
            { id: 'activity-2', action: 'Data exported', time: '15 minutes ago', type: 'export' },
            { id: 'activity-3', action: 'System updated', time: '1 hour ago', type: 'system' },
            { id: 'activity-4', action: 'Backup completed', time: '3 hours ago', type: 'backup' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityBgColor(item.type)}`}>
                  <Activity size={16} className={getActivityTextColor(item.type)} />
                </div>
                <span className="text-gray-900">{item.action}</span>
              </div>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
