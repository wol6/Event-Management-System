import React from 'react'
import { NavLink } from 'react-router-dom'
function Home() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
                <div className="max-w-3xl text-center">
                    <div className="bg-white shadow-xl rounded-3xl p-10 border border-gray-200">
                        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                            Plan & Organize Events
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            Create events, manage attendees, track registrations, organize schedules, and streamline event planning from one powerful platform.
                        </p>

                        <div className="mt-10 flex justify-center gap-4">
                            <NavLink
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200 shadow-md"
                            >
                                Login
                            </NavLink>

                            <button className="border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-6 py-3 rounded-xl font-medium transition duration-200 text-gray-700">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home