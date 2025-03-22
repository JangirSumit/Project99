import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { FaHome, FaUsers, FaUserPlus, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const profile = state.profile; // Assuming 'profile' contains user info

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
            <div className="bottom-nav d-md-none">
                <Link to="/" className="nav-link">
                    <FaHome />
                    <span>Home</span>
                </Link>
                <Link to="/users" className="nav-link">
                    <FaUsers />
                    <span>Users</span>
                </Link>
                <Link to="/register" className="nav-link">
                    <FaUserPlus />
                    <span>Register</span>
                </Link>
                {profile.name ? (
                    <Link to="/profile" className="nav-link">
                        <FaUser />
                        <span>Profile</span>
                    </Link>
                ) : null}
            </div>

            {/* Bottom Nav CSS */}
            <style>
                {`
                .bottom-nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: #fff;
                    border-top: 1px solid #ccc;
                    display: flex;
                    justify-content: space-around;
                    padding: 10px 0;
                    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
                }
                .bottom-nav .nav-link {
                    text-decoration: none;
                    color: #333;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .bottom-nav .nav-link svg {
                    font-size: 22px;
                }
                `}
            </style>
        </>
    );
};

export default Navbar;
