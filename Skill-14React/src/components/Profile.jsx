import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Profile() {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const id = localStorage.getItem("userId")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/auth/user/${id}`)
                setUser(res.data)
            } catch (error) {
                console.error("Failed to fetch user data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchUser()
        } else {
            navigate("/login")
        }
    }, [id, navigate])

    const logout = () => {
        localStorage.removeItem("userId")
        navigate("/login")
    }

    if (isLoading) {
        return (
            <div className="profile-container">
                <nav className="navbar">
                    <div className="nav-brand">
                        <h2>MyApp</h2>
                    </div>
                    <div className="nav-links">
                        <button onClick={() => navigate("/home")} className="nav-link">
                            Home
                        </button>
                        <button onClick={() => navigate("/profile")} className="nav-link active">
                            Profile
                        </button>
                        <button onClick={logout} className="nav-link logout">
                            Logout
                        </button>
                    </div>
                </nav>
                <main className="main-content">
                    <div className="loading">Loading profile...</div>
                </main>
            </div>
        )
    }

    return (
        <div className="profile-container">
            <nav className="navbar">
                <div className="nav-brand">
                    <h2>MyApp</h2>
                </div>
                <div className="nav-links">
                    <button onClick={() => navigate("/home")} className="nav-link">
                        Home
                    </button>
                    <button onClick={() => navigate("/profile")} className="nav-link active">
                        Profile
                    </button>
                    <button onClick={logout} className="nav-link logout">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="main-content">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="avatar">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <h1>{user.name || "User"}</h1>
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <label>Full Name</label>
                            <p>{user.name || "Not provided"}</p>
                        </div>
                        <div className="detail-item">
                            <label>Email Address</label>
                            <p>{user.email || "Not provided"}</p>
                        </div>
                        <div className="detail-item">
                            <label>User ID</label>
                            <p>{id}</p>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button
                            onClick={() => navigate("/home")}
                            className="secondary-button"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile