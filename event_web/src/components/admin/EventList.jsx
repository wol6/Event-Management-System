import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import EventDialog from './EventDialog'
import ViewAttendee from './ViewAttendee'

function EventList({refreshList}) {
    const [open, setOpen] = useState(false)
    const [attOpen, setAttOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [editEventObj, setEditEventObj] = useState({})
    const [attendeeList, setAttendeeList] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})

    useEffect(() => {
        showEvents()
    }, [refreshList])
    async function showEvents() {
        try {
            const { data: resp } = await api.get('/show-event',{
                params: {
                    pageNo: 0,
                    limit:0,
                }
            })
            if (resp.success) {
                setEvents(resp.list)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleView(event) {
        setAttOpen(true)
        setSelectedEvent(event)

        try {
            const { data: resp } = await api.get('/get-attendee', {
                params: { id: event._id }
            })
            if (resp.success) {
                const attendeesList = resp.attendeeList[0].userDetails.map(user => ({
                    name: user.name,
                    email: user.email
                }))
                setAttendeeList(attendeesList)
            }

        } catch (e) {
            console.log(e)
        }

    }
    async function handleEdit(event) {
        setOpen(true)
        setEditEventObj(event)

    }
    async function handleDelete(event) {
        const userConfirmed = window.confirm("Are You Sure")
        if (!userConfirmed) return
        try {
            const { data: resp } = await api.delete(`/delete-event/${event._id}`)
            if (resp.success) {
                showEvents()
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <tr>
                        <th scope="col" className="px-6 py-4">Event Name</th>
                        <th scope="col" className="px-6 py-4">Date</th>
                        <th scope="col" className="px-6 py-4">Time</th>
                        <th scope="col" className="px-6 py-4">Location</th>
                        <th scope="col" className="px-6 py-4">Category</th>
                        <th scope="col" className="px-6 py-4">Capacity</th>
                        <th scope="col" className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white font-medium text-gray-700">
                    {events.map((event) => (
                        <tr key={event._id} className="transition-colors duration-150 hover:bg-gray-50/70">
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                                {event.title}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                {event.date}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                {event.time}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                {event.location}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                {event.category}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                {event.capacity}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                <div className="flex justify-end gap-3">
                                    {/* View Button */}
                                    <button onClick={() => handleView(event)}
                                        className="text-blue-600 cursor-pointer hover:text-blue-900 transition-colors">
                                        View
                                    </button>
                                    {/* Edit Button */}
                                    <button className="text-amber-600 cursor-pointer hover:text-amber-900 transition-colors"
                                        onClick={() => handleEdit(event)}>
                                        Edit
                                    </button>
                                    {/* Delete Button */}
                                    <button className="text-red-600 cursor-pointer hover:text-red-900 transition-colors"
                                        onClick={() => handleDelete(event)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EventDialog open={open} setOpen={setOpen} editEventObj={editEventObj} />
            <ViewAttendee attOpen={attOpen} setAttOpen={setAttOpen}
                selectedEvent={selectedEvent} attendeeList={attendeeList} />
        </div>
    )
}

export default EventList