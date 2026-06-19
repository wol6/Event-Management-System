import React, { useState } from 'react'

function SeatCard() {
    const totalSeats = 50;
    const seatsArray = Array.from({ length: totalSeats }, (_, index) => index + 1);

    // State to track the single selected seat number (null means none selected)
    const [selectedSeat, setSelectedSeat] = useState(null);
    const booked = [5,9]

    const handleSeatClick = (seatNumber) => {
        // If clicking the already selected seat, deselect it. Otherwise, select the new one.
        setSelectedSeat(prevSeat => prevSeat === seatNumber ? null : seatNumber);
    };

    return (
        <>
        {/* Added 'relative' to the container wrapper to position the button on top-right-mid */}
        <div className="relative mt-6 p-6 bg-gray-50 rounded-xl max-w-2xl mx-auto shadow-sm">
            
            {/* --- Added Book Now Button --- */}
            <div className="absolute top-5 right-6">
                <button 
                    disabled={!selectedSeat}
                    onClick={() => alert(`Seat ${selectedSeat} confirmed!`)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm
                        ${selectedSeat 
                            ? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 active:scale-95' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Book Now
                </button>
            </div>

            <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">-------------------</h3>
                <p className="text-sm text-gray-500 mt-1">
                    {/* Selected Seat: {selectedSeat ? `#${selectedSeat}` : 'None'} */}
                </p>
            </div>

            {/* 5x10 Grid Layout */}
            <div className="grid grid-cols-10 gap-3 justify-items-center">
                {seatsArray.map((seatNumber) => {
                    const isSelected = selectedSeat === seatNumber;
                    const isBooked = booked.includes(seatNumber); // Check if seat is in backend array

                    return (
                        <button
                            key={seatNumber}
                            onClick={() => handleSeatClick(seatNumber)}
                            disabled={isBooked} // Step 1: HTML restriction to prevent clicks
                            className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-all select-none
                ${isBooked
                                    ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed line-through' // Step 2: Booked styles
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
