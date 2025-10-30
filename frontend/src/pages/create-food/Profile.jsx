import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true)
                console.log('Fetching profile for ID:', id)
                
                const response = await axios.get(`http://localhost:3000/api/food-partner/${id}`, { 
                    withCredentials: true 
                })
                
                console.log('Full API Response:', response.data)
                console.log('Food Partner Data:', response.data.foodPartner)
                console.log('Food Items:', response.data.foodPartner?.foods)
                
                setProfile(response.data.foodPartner)
                // Safely set videos - use empty array if foodItems is undefined
                setVideos(response.data.foodPartner.foods || [])
            } catch (err) {
                console.error('Error fetching profile:', err)
                setError(err.response?.data?.message || 'Failed to load profile')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProfile()
        }
    }, [id])

    // Loading state
    if (loading) {
        return (
            <main className="profile-page">
                <div className="loading">Loading profile...</div>
            </main>
        )
    }

    // Error state
    if (error) {
        return (
            <main className="profile-page">
                <div className="error">Error: {error}</div>
            </main>
        )
    }

    // No profile found
    if (!profile) {
        return (
            <main className="profile-page">
                <div className="error">Profile not found</div>
            </main>
        )
    }

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    <img 
                        className="profile-avatar" 
                        src={profile.avatar || "https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"} 
                        alt={profile.name} 
                    />
                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile.name || 'No name'}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile.address || 'No address provided'}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{profile.totalMeals || videos.length}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile.customersServed || 0}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {/* FIXED: Check if videos exists and has items */}
                {videos && videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video._id || video.id} className="profile-grid-item">
                            <video
                                className="profile-grid-video"
                                controls
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                src={video.video} 
                                muted
                                preload="metadata"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))
                ) : (
                    <div className="no-videos">
                        <p>No food videos available yet</p>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Profile