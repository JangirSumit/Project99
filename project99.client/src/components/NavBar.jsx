// src/Navbar.jsx
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import useLocalStorage from '../hooks/useLocalStorage';
import {
    DesktopNav,
    Brand,
    NavLinks,
    NavLink,
    MobileNav,
    MobileButton
} from '../themes/NavbarStyles';
import {
    FaHome,
    FaUsers,
    FaUserPlus,
    FaSignOutAlt
} from 'react-icons/fa';

const Navbar = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [authToken] = useLocalStorage('authToken', '');
    const profile = state.profile || {};
    const location = useLocation();
    const navigate = useNavigate();

    // Hide if not logged in
    if (!authToken.token) return null;

    const isAdmin = profile.role === 0;
    const handleLogout = () => {
        dispatch({ type: 'logout' });
        navigate("/login", { replace: true, state: { from: location } });
    };
    const currentPath = location.pathname;

    return (
        <>
            {/* Desktop Navbar */}
            <DesktopNav>
                <Brand>Project 99</Brand>
                <NavLinks>
                    {isAdmin && (
                        <>
                            <NavLink>
                                <Link to="/">Home</Link>
                            </NavLink>
                            <NavLink>
                                <Link to="/users">Users</Link>
                            </NavLink>
                            <NavLink>
                                <Link to="/register">Register</Link>
                            </NavLink>
                        </>
                    )}
                    <NavLink>
                        <button onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </NavLink>
                </NavLinks>
            </DesktopNav>

            {/* Mobile Bottom Navbar */}
            <MobileNav>
                {isAdmin && (
                    <>
                        <MobileButton
                            as={Link}
                            to="/"
                            $active={currentPath === '/'}
                        >
                            <FaHome />
                            Home
                        </MobileButton>
                        <MobileButton
                            as={Link}
                            to="/users"
                            $active={currentPath === '/users'}
                        >
                            <FaUsers />
                            Users
                        </MobileButton>
                        <MobileButton
                            as={Link}
                            to="/register"
                            $active={currentPath === '/register'}
                        >
                            <FaUserPlus />
                            Register
                        </MobileButton>
                    </>
                )}
                <MobileButton onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                </MobileButton>
            </MobileNav>
        </>
    );
};

export default Navbar;
