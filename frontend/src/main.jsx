import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// contexts 
import AuthContextProvider from './contexts/authContext.jsx'
import BugsContextProvider from './contexts/bugsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <BugsContextProvider>
                <App />
            </BugsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)
