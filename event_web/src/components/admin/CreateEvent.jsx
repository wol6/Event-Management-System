import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import EventDialog from './EventDialog'

function CreateEvent() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">All Scheduled Events</h2>
                    <p className="text-sm text-gray-500">Manage, edit, or track existing platform configurations.</p>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    +  Create Event
                </button>
            </div>

            <EventDialog open={open} setOpen={setOpen}/>

        </>
    )
}

export default CreateEvent