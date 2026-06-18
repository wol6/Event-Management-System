import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'

function EventDialog({ open, setOpen, editEventObj }) {

    const dialogRef = useRef(null)

    const initialFormState = {
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        capacity: "",
        category: "",
    };

    const [eventObj, setEventObj] = useState(initialFormState)
    function handleChange(e) {
        const { name, value } = e.target
        setEventObj((prev) => {
            return { ...prev, [name]: value }
        })
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [open])
    useEffect(() => {
        if (editEventObj) {
            setEventObj({
                title: editEventObj.title || "",
                description: editEventObj.description || "",
                location: editEventObj.location || "",
                date: editEventObj.date ? editEventObj.date.split('T')[0] : "",
                time: editEventObj.time || "",
                capacity: editEventObj.capacity || "",
                category: editEventObj.category || ""
            });
        } else {
            setEventObj(initialFormState);
        }
    }, [editEventObj])

    async function handleCreateEvent(e) {
        e.preventDefault();
        try {
            if (editEventObj) {
                const { data: resp } = await api.put(`/update-event/${editEventObj._id}`, eventObj)
                if (resp.success) {
                    setEventObj(initialFormState)
                    setOpen(false)
                }
            } else {
                const { data: resp } = await api.post('/add-event', eventObj)
                if (resp.success) {
                    setEventObj(initialFormState)
                    setOpen(false)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={() => setOpen(false)}
                className="w-screen h-screen max-w-none max-h-none m-0 border-0 bg-white shadow-none backdrop:bg-black/50"
            >

                <div className="w-full h-full flex flex-col bg-white overflow-y-auto">

                    <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
                        <h2 className="text-2xl font-bold text-gray-900">Create Event</h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-3xl text-gray-400 hover:text-gray-600 transition"
                        >
                            &times;
                        </button>
                    </div>


                    <form onSubmit={handleCreateEvent} className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-6">

                        {/* Event Title */}
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                                Event Title
                            </label>
                            <input
                                id="title"
                                name='title'
                                value={eventObj.title}
                                type="text"
                                placeholder="React Workshop 2026"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name='description'
                                value={eventObj.description}
                                rows="4"
                                placeholder="Enter event description..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                id="location"
                                name='location'
                                value={eventObj.location}
                                type="text"
                                placeholder="Mumbai"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    id="date"
                                    name='date'
                                    value={eventObj.date}
                                    type="date"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-700">
                                    Time
                                </label>
                                <input
                                    id="time"
                                    name='time'
                                    value={eventObj.time}
                                    type="time"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Capacity & Category */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="capacity" className="mb-2 block text-sm font-medium text-gray-700">
                                    Capacity
                                </label>
                                <input
                                    id="capacity"
                                    name='capacity'
                                    value={eventObj.capacity}
                                    type="text"
                                    placeholder="100"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <input
                                    id="category"
                                    name='category'
                                    value={eventObj.category}
                                    type="text"
                                    placeholder="meeting"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Image */}
                        {/* <div>
                            <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
                                Event Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                        </div> */}

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 transition shadow-sm"
                            >
                               {editEventObj?"Update Event":" Create Event"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default EventDialog