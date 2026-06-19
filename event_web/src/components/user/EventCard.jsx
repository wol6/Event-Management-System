import React, { useState } from "react";
import api from "../../api/axios";
import Reservation from "./Reservation";

function EventCard({ events, setRefresh }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [eventObj,setEventObj] = useState({})

    async function handleAttendes(id) {
        try {
            const { data: resp } = await api.post('/reg-event', { id })
            if (resp.success) {
                setRefresh(prev => prev + 1)
            }
        } catch (e) {
            console.log(e)
        }
    }
    function openDialogBox(event){
        setOpenDialog(true)
        setEventObj(event)
    }
    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.length === 0 && (<div>No Event</div>)}
            {events.map((event) => (
                <div
                    key={event._id}
                    className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                    {/*
                    <img
                        src={event.image}
                        alt={event.title}
                        className="h-52 w-full object-cover"
                    />
                    */}

                    <div className="p-5">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                {event.title}
                            </h3>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                {event.category}
                            </span>
                        </div>

                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                            {event.description}
                        </p>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>📍 <span className="font-medium">{event.location}</span></p>
                            <p>📅 <span className="font-medium">{event.date}</span></p>
                            <p>🕒 <span className="font-medium">{event.time}</span></p>
                            <p>👥 <span className="font-medium">{event.booked}/{event.capacity} Seats</span></p>
                        </div>

                        <button className={`mt-6 w-full rounded-lg py-3 font-semibold transition ${event.isJoined
                            ? "bg-blue-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                            }`}
                            disabled={event.isJoined}
                            // onClick={() => handleAttendes(event._id)}
                            onClick={() => openDialogBox(event)}   >
                            {event.isJoined ? "Joined" : "Register"}
                        </button>
                    </div>
                </div>
            ))}
            <Reservation open={openDialog} setOpen={setOpenDialog} eventObj={eventObj} />
        </div>
    );
}

export default EventCard;