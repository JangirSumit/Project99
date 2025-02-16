import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from './components/Home';
import Users from './components/Users';
import { GlobalContextProvider } from './contexts/GlobalContext';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Profile from "./components/Profile";
import useLocalStorage from "./hooks/useLocalStorage";  // Import the custom hook

function AppContent() {
    const [authToken] = useLocalStorage("authToken", "");  // Get auth token from localStorage
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken.token) {
            navigate("/login");  // Redirect to login if no authToken
        }
    }, [authToken, navigate]);

    return (
        <div className="container-fluid p-0">
            <ProtectedRoute><Navbar /></ProtectedRoute>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <GlobalContextProvider>
            <Router>
                <AppContent />
            </Router>
        </GlobalContextProvider>
    );
}

export default App;
