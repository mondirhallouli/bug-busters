// react router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
// layouts
import RootLayout from "./layouts/RootLayout"
// pages
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import ReportPage from "./pages/ReportPage"
// contexts
import BugsContextProvider from "./contexts/bugsContext"
import AuthContextProvider from "./contexts/authContext"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/reports/:reportId" element={<ReportPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Route>
    )
)

function App() {

    return (
        <AuthContextProvider>
            <BugsContextProvider>
                <div className='app'>
                    <RouterProvider router={router} />
                </div>
            </BugsContextProvider>
        </AuthContextProvider>
    )
}

export default App
