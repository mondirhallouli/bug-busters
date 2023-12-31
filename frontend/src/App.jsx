// react router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// layouts
import RootLayout from "./layouts/RootLayout"
// pages
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import ReportPage from "./pages/ReportPage"
// contexts
import useAuthContext from "./hooks/useAuthContext"


function App() {
    const { user } = useAuthContext();

    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={user ? <HomePage /> : <Navigate to="/login" />} />
                        <Route path="/reports/:reportId" element={user ? <ReportPage /> : <Navigate to="/login" />} />
                        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
                        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
