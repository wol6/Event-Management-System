import React, { useEffect, useState } from 'react'
import EventCard from '../../components/user/EventCard'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function UserHome() {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [currentPage,setCurrentPage] = useState(0)
    const [totalPages,setTotalPages] = useState(0)
    const [searchQuery,setSearchQuery] = useState("")

    useEffect(() => {
        showEvents()
    }, [currentPage,searchQuery])

    async function showEvents() {
        const limit = 3
        try {
            const { data: resp } = await api.get('/show-event',{
                params:{
                    pageNo:currentPage,
                    limit,
                    search:searchQuery
                }
            })
            if (resp.success) {
                const totalPage = Math.ceil(resp.list.length/limit)
                setTotalPages(totalPage)
                setEvents(resp.list)
            }
        } catch (e) {
            console.log(e)
        }
    }
    async function handleLogout() {
        try {
            const { data: resp } = await api.post('/logout')
            if (resp.success) {
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
            {/* 1. Header Banner & Logout Row */}
            <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        Event Planner
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg cursor-pointer border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Dashboard Layout Container */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search events by title, location or category..."
                        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>

                {/* Section Title */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Upcoming Events
                    </h2>

                    <p className="text-gray-500">
                        Browse available events and register your seat.
                    </p>
                </div>

                {/* Events Grid */}
                <EventCard events={events} />
                <div className="mt-4 flex justify-center items-center gap-2 flex-wrap">
                    {/* Previous */}
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                    >
                        Prev
                    </button>


                    {/* Next */}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </main>

        </div>
    )
}

export default UserHome