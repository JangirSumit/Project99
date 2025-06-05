/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state, dispatch } = useContext(GlobalContext);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (state.isAuthenticated || hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        const fetchProfile = async () => {
            try {
                const data = JSON.parse(localStorage.getItem("authToken"));
                if (!data?.token) {
                    navigate("/login", { replace: true, state: { from: location } });
                    return;
                }

                const response = await fetch("/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data.token}`
                    }
                });

                if (response.ok) {
                    const profileData = await response.json();
                    dispatch({ type: "setProfile", payload: profileData });
                } else {
                    navigate("/login", { replace: true, state: { from: location } });
                }
            } catch (error) {
                console.error("Profile fetch failed:", error);
                navigate("/login", { replace: true, state: { from: location } });
            }
        };

        fetchProfile();
    }, [state.isAuthenticated, dispatch, navigate, location]);

    return state.isAuthenticated ? children : null;
};

export default ProtectedRoute;
