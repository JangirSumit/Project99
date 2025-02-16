import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import useLocalStorage from "../hooks/useLocalStorage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Controls screen visibility
    const { dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [authToken, setAuthToken, removeItem] = useLocalStorage("authToken", "");

    useEffect(() => {
        const token = authToken.token;

        if (token) {
            fetch("/api/users/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(async (response) => {
                    if (response.ok) {
                        const profileData = await response.json();
                        dispatch({ type: "setProfile", payload: profileData });
                        navigate("/", { replace: true });
                    } else {
                        // If profile fetch fails, clear token and show login
                        removeItem("authToken");
                        setIsLoading(false);
                        navigate("/login", { replace: true });
                    }
                })
                .catch(() => {
                    removeItem("authToken");
                    setIsLoading(false);
                    navigate("/login", { replace: true });
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/users/login", {
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
                const data = await response.json();
                if (data?.token) {
                    setAuthToken(data);

                    // Fetch profile after successful login
                    const profileResponse = await fetch("/api/users/profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${data.token}`
                        }
                    });

                    if (profileResponse.ok) {
                        const profileData = await profileResponse.json();
                        dispatch({ type: "setProfile", payload: profileData });
                        navigate("/", { replace: true });
                    }
                }
            } else {
                alert("Invalid username or password...");
            }
        } catch (e) {
            alert(e.message);
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
                <button className="btn btn-primary w-100" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
