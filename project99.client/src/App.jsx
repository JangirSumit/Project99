import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Users from './components/Users';
import { GlobalContextProvider } from './contexts/GlobalContext';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Profile from "./components/Profile";

function App() {

    return (
        <GlobalContextProvider>
            <Router>
                <div className="container-fluid p-0">
                    <ProtectedRoute><Navbar /></ProtectedRoute>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

                        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    </Routes>
                </div>
            </Router>
        </GlobalContextProvider>
    );
}

export default App;