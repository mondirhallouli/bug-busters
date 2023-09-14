import { Link, Outlet } from "react-router-dom";
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';

export default function RootLayout() {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="root-layout relative">
            <header className="bg-skyblue p-4 mb-24">
                <nav className="container md:w-3/5 mx-auto flex justify-between items-center gap-6 font-openSans">
                    <h2 className="font-inter font-bold text-xl">
                        <Link to="/" className="text-darkblue">Bug Busters</Link>
                    </h2>
                    {/* display this when the user is logged in */}
                    {
                        user && (
                            <div className="flex items-center gap-4">
                                <p className="text-base italic text-darkblue">@{user.username}</p>
                                <button onClick={handleLogout} className="py-2 px-4 bg-transparent border border-solid rounded-md border-pinkred cursor-pointer text-pinkred hover:text-pinkwhite hover:bg-pinkred">Logout</button>
                            </div>
                        )
                    }
                    {/* display this when user is logged out */}
                    {!user &&
                        (
                            <div>
                                <Link to="/login" className="mr-6">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )
                    }
                </nav>

            </header>
            <main className="container md:w-3/5 mx-auto p-4">
                <Outlet />
            </main>
        </div>
    )
}