import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("userId")
        navigate("/login")
    }

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="nav-brand">
                    <h2>MyApp</h2>
                </div>
                <div className="nav-links">
                    <button onClick={() => navigate("/home")} className="nav-link active">
                        Home
                    </button>
                    <button onClick={() => navigate("/profile")} className="nav-link">
                        Profile
                    </button>
                    <button onClick={logout} className="nav-link logout">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="main-content">
                <div className="welcome-card">
                    <h1>Welcome to Your Dashboard</h1>
                    <p>You are successfully logged in. Explore your profile or manage your account.</p>

                    <div className="action-buttons">
                        <button
                            onClick={() => navigate("/profile")}
                            className="primary-button"
                        >
                            View Profile
                        </button>
                        <button
                            onClick={logout}
                            className="secondary-button"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home