import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext"; // Ensure correct path
import { FaHome, FaUsers, FaUserPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const profile = state?.profile || {}; // Adding safety check

    return (
        <>
            {/* Top Navbar (Desktop View) */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary w-100 d-none d-md-flex">
                <div className="container">
                    <Link className="navbar-brand" to="/">Project 99</Link>

                    {/* Mobile Toggle Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Menu */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>

                            {/* Profile Dropdown */}
                            {profile.name && (
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {profile.name}
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                <FaUser className="me-2" /> Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => dispatch({ type: "logout" })}
                                            >
                                                <FaSignOutAlt className="me-2" /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Bottom Navbar (Mobile View) */}
            <nav className="navbar fixed-bottom navbar-light bg-light d-md-none border-top">
                <div className="container d-flex justify-content-around">
                    <Link to="/" className="nav-link text-center">
                        <FaHome size={24} />
                        <div>Home</div>
                    </Link>
                    <Link to="/users" className="nav-link text-center">
                        <FaUsers size={24} />
                        <div>Users</div>
                    </Link>
                    <Link to="/register" className="nav-link text-center">
                        <FaUserPlus size={24} />
                        <div>Register</div>
                    </Link>
                    {profile.name && (
                        <Link to="/profile" className="nav-link text-center">
                            <FaUser size={24} />
                            <div>Profile</div>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
