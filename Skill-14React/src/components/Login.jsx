import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await axios.post("http://localhost:8080/auth/login", {
                email, password
            })
            if (res.data) {
                localStorage.setItem("userId", res.data.id)
                navigate("/home")
            } else {
                alert("Invalid Login")
            }
        } catch (error) {
            alert("Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={submit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login