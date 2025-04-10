import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
