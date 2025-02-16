import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const { state, dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.isAuthenticated) {
            navigate("/", { replace: true });
        }

    }, [state.isAuthenticated])

    const handleLogin = async () => {
        try {
            var response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: email,
                    password: password
                }),
            });

            if (response.ok) {
                var data = await response.json();

                if (data) {
                    dispatch({ type: "login", payload: data })
                }
            } else {
                alert("Invalid username or password...")
            }
        } catch (e) {
            alert(e.message);
        }
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
                >
                    Login
                </button>
            </div>
        </div>
    );
};


export default Login;
