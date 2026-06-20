import React, { useEffect, useState } from 'react'
import EventCard from '../../components/user/EventCard'
import api from '../../api/axios'
import Header from '../../components/layout/Header'

function UserHome() {
    const [refresh, setRefresh] = useState(0)
    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        showEvents()
    }, [currentPage, searchQuery, refresh])

    async function showEvents() {
        const limit = 3
        try {
            const { data: resp } = await api.get('/show-event', {
                params: {
                    pageNo: currentPage,
                    limit,
                    search: searchQuery
                }
            })
            if (resp.success) {
                const totalPage = Math.ceil(resp.totalPgCount / limit)
                setTotalPages(totalPage)
                setEvents(resp.list)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">

            <Header />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search events by title, location or category..."
                        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Upcoming Events
                    </h2>

                    <p className="text-gray-500">
                        Browse available events and register your seat.
                    </p>
                </div>

                {/* Events */}
                <EventCard events={events} setRefresh={setRefresh} />

                <div className="mt-4 flex justify-center items-center gap-2 flex-wrap">
                    <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-3 py-2 border cursor-pointer rounded-lg disabled:opacity-50 hover:bg-gray-100"
                    >
                        Prev
                    </button>

                    <button
                        disabled={currentPage >= totalPages - 1}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-3 py-2 border cursor-pointer rounded-lg disabled:opacity-50 hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </main>

        </div>
    )
}

export default UserHome