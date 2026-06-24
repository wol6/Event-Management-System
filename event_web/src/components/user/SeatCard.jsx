import React, { useState } from 'react'
import api from '../../api/axios'

function SeatCard({ eventObj, setOpen }) {

    const totalSeats = eventObj.capacity
    const seatsArray = Array.from({ length: totalSeats }, (_, index) => index + 1)

    const [selectedSeats, setselectedSeats] = useState([])
    const booked = eventObj.bookedArr

    const handleSeatClick = (seatNumber) => {
        // setselectedSeats(prevSeat => prevSeat === seatNumber ? null : seatNumber)
        setselectedSeats((prev) => {
            if (prev.includes(seatNumber)) {
                return prev.filter((seat) => seat !== seatNumber)
            }
            if (prev.length == 4) {
                alert("You cannot book more than 4 seats")
                return prev
            }
            return [...prev, seatNumber]
        })
    }
    async function handleSeatReservation() {
        try {
            const { data: resp } = await api.post('/reserve-seat', {
                id: eventObj._id,
                seatNos: selectedSeats
            })
            setOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="relative mt-6 p-6 bg-gray-50 rounded-xl max-w-2xl mx-auto shadow-sm">

                <div className="absolute top-5 right-6">
                    <button
                        disabled={selectedSeats.length == 0}
                        onClick={() => handleSeatReservation()}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm
                        ${selectedSeats.length
                                ? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 active:scale-95'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Book Now
                    </button>
                </div>

                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">-------------------</h3>
                </div>

                {/* 5x10 Grid */}
                <div className="grid grid-cols-10 gap-3 justify-items-center">
                    {seatsArray.map((seatNumber) => {
                        const isSelected = selectedSeats.includes(seatNumber)
                        const isBooked = booked.includes(seatNumber)

                        return (
                            <button
                                key={seatNumber}
                                onClick={() => handleSeatClick(seatNumber)}
                                disabled={isBooked}
                                className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-all select-none
                ${isBooked
                                        ? 'bg-red-200 border-red-300 text-gray-400 cursor-not-allowed line-through' // Step 2: Booked styles
                                        : isSelected
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm cursor-pointer active:scale-95' // Selected styles
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-500 cursor-pointer active:scale-95' // Available styles
                                    }`}
                            >
                                {seatNumber}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default SeatCard
