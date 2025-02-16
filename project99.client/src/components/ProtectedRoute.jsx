/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { state, } = useContext(GlobalContext);

    useEffect(() => {
        if (!state.isAuthenticated) {
            navigate("/login");
        }
    }, [state.isAuthenticated]);

    return state.isAuthenticated ? children : null;
};

export default ProtectedRoute;