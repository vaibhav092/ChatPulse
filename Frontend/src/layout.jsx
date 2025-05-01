import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
function Layout() {
    return (
        <div className="h-full flex flex-col">
            <div className="h-11">
                <Navbar />
            </div>
            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
