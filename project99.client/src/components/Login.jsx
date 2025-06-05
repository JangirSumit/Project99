import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    // Compose the from path including query string correctly
    const from = location.state?.from?.pathname + (location.state?.from?.search || "") || "/";

    useEffect(() => {
        const token = authToken.token;
        if (token) {
            navigate(from, { replace: true }); // Redirect to saved URL, not always "/"
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data?.token) {
                    setAuthToken(data);
                    navigate(from, { replace: true }); // Redirect to saved URL after login
                }
            } else {
                alert("Invalid username or password...");
            }
        } catch (e) {
            alert("Login failed: " + e.message);
        }
    };

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                <h2 className="text-center mb-3">Login</h2>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label">Remember Me</label>
                </div>
                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
