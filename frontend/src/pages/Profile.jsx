import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { User, Mail, Calendar, Settings } from 'lucide-react'

function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || 'User',
    email: user?.email || '',
    joinDate: new Date(user?.created_at).toLocaleDateString() || '',
    bio: 'Welcome to my profile!'
  })

  const handleSave = () => {
    // In a real app, you would update the profile in Supabase here
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Settings size={16} />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={48} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">Member since {profile.joinDate}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid gap-6">
            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <input
                id="profile-email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Display Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="profile-bio" className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                id="profile-bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                rows={4}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
              />
            </div>

            <div>
              <label htmlFor="profile-joindate" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Join Date
              </label>
              <input
                id="profile-joindate"
                type="text"
                value={profile.joinDate}
                disabled
                className="input-field bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-4">
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Stats */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500">42</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">128</div>
            <div className="text-sm text-gray-600">Actions Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">15</div>
            <div className="text-sm text-gray-600">Projects Created</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    user_metadata: PropTypes.shape({
      name: PropTypes.string
    }),
    email: PropTypes.string,
    created_at: PropTypes.string
  })
}

Profile.defaultProps = {
  user: null
}

export default Profile
