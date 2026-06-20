import React, { useEffect, useRef } from 'react'

function ViewAttendee({ attOpen, setAttOpen, selectedEvent, attendeeList }) {
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (attOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [attOpen])
    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={() => setAttOpen(false)}
                className="w-screen h-screen max-w-none max-h-none m-0 border-0 bg-white shadow-none backdrop:bg-black/50"
            >

                <div className="w-full h-full flex flex-col bg-white overflow-y-auto">

                    <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                        <button
                            onClick={() => setAttOpen(false)}
                            className="text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
                        {!attendeeList || attendeeList.length === 0 ? (
                            /* Empty State Display Banner */
                            <div className="text-center py-12 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 mt-6">
                                <p className="text-gray-500 font-medium">No attendees have registered for this event yet.</p>
                            </div>
                        ) : (
                            /* Data Table Layout */
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mt-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Name</th>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white font-medium text-gray-700">
                                            {attendeeList.map((attendee, index) => (
                                                <tr key={index} className="transition-colors duration-150 hover:bg-gray-50/70">
                                                    <td className="whitespace-nowrap px-6 py-4 text-gray-400 font-normal">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                                                        {attendee.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                                        {attendee.email}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </dialog>
        </>
    )
}

export default ViewAttendee