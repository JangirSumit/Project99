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
import Register from './components/Register';
import ForbiddenAccess from './components/ForbiddenAccess';
import ViewTicket from './components/ViewTicket';

function AppContent() {
    return (
        <div className="container-fluid p-0">
            <ProtectedRoute><Navbar /></ProtectedRoute>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
                <Route path="/forbiddenaccess" element={<ForbiddenAccess />} />
                <Route path="/viewticket" element={<ViewTicket />} />
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
