import React from 'react'

function Navbar() {
    return (
        <>
            <nav className="bg-[#87CEEB] text-[#36454F] shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">ChatPulse</h1>
                    <div className="flex items-center gap-4">
                        <button className="bg-[#6495ED] text-white px-4 py-2 rounded-lg hover:bg-[#5a85d1] transition">
                            Login
                        </button>
                        <button className="bg-[#E6E6FA] text-[#36454F] px-4 py-2 rounded-lg hover:bg-[#d8d8f0] transition">
                            Signup
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
