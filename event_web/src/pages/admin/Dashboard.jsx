import React, { useState } from 'react';
import EventList from '../../components/admin/EventList';
import CreateEvent from '../../components/admin/CreateEvent';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    const [refreshList,setRefreshList] = useState(0)

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

    function triggerRefresh(){
        setRefreshList((prev)=>prev+1)
    }


    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
            {/* 1. Header Banner & Logout Row */}
            <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        Event Management Admin
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-gray-300 bg-white cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Dashboard Layout Container */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <CreateEvent onRefresh={triggerRefresh}/>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <EventList refreshList={refreshList} />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
