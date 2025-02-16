import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Users from './components/Users';
import { GlobalContextProvider } from './contexts/GlobalContext';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

function App() {

    return (
        <GlobalContextProvider>
            <Router>
                <div className="container-fluid p-0">
                    <ProtectedRoute><Navbar /></ProtectedRoute>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

                        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                        <Route path="/login" element={<Login/> }/>
                    </Routes>
                </div>
            </Router>
        </GlobalContextProvider>
    );
}

export default App;