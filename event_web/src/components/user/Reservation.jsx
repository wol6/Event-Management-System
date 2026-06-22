import React, { useEffect, useRef } from 'react'
import SeatCard from './SeatCard';

function Reservation({open,setOpen,eventObj}) {
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [open])
    return (
        <dialog
            ref={dialogRef}
            onClose={() => setOpen(false)}
            className="w-screen h-screen max-w-none max-h-none m-0 border-0 bg-white shadow-none backdrop:bg-black/50"
        >

            <div className="w-full h-full flex flex-col bg-white overflow-y-auto">

                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">Reserve Seat - {eventObj.title}</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition"
                    >
                        &times;
                    </button>
                </div>
            <SeatCard eventObj={eventObj} setOpen={setOpen}/>

            </div>
        </dialog>
    )
}

export default Reservation