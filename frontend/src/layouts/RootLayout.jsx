import { Link, NavLink, Outlet } from "react-router-dom";
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

export default function RootLayout() {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <div>
                        <h2 className="logo">
                            <Link to="/">Bug Busters</Link>
                        </h2>
                    </div>
                    {/* display this when the user is logged in */}
                    {
                        user && (
                            <div className="dash-menu">
                                <NavLink to="/" className="dash-link">Home</NavLink>
                                <NavLink to="/reports" className="dash-link">My Reports</NavLink>
                                <p className="username">{user.username}</p>
                                <button onClick={handleLogout} className="logout">Logout</button>
                            </div>
                        )
                    }
                    {/* display this when user is logged out */}
                    {!user &&
                        (
                            <div className="menu">
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )
                    }
                </nav>

            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}