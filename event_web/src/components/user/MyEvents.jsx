import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'

function MyEvents({ openMyEvent, setOpenMyEvent }) {
  const dialogRef = useRef(null)
  const [detailsArr, setDetailsArr] = useState([])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (openMyEvent) {
      dialog.showModal()
      getEvents()
    } else {
      dialog.close()
    }
  }, [openMyEvent])

  async function getEvents() {
    try {
      const { data: resp } = await api.get('/get-user-events')
      if (resp.success) {
        setDetailsArr(resp.details)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpenMyEvent(false)}
      className="w-screen h-screen max-w-none max-h-none m-0 border-0 bg-white shadow-none backdrop:bg-black/50"
    >
      <div className="w-full h-full flex flex-col bg-white">

        {/* Sticky Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">My Registered Events</h2>
          <button
            onClick={() => setOpenMyEvent(false)}
            className="text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto p-6">
          {detailsArr.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No events registered.</div>
          ) : (
            <div className="inline-block min-w-full align-middle border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3.5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3.5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3.5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3.5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3.5 text-sm font-semibold text-gray-900 uppercase tracking-wider">Seats Registered</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {detailsArr.map((item, index) => {
                    // Extracting the object inside the MongoDB lookup array safely
                    const details = item.eventDetails?.[0] || {};

                    return (
                      <tr key={item._id || index} className="hover:bg-gray-50/70 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {details.title || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {details.location || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {details.date || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {details.time || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          
                          {(()=>{
                            const seats = Array.isArray(item.seatNos) ? item.seatNos.flat().join(', ') : []
                            return(
                              <span>{seats.length>0?seats:"open"}</span>
                            )
                          })()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </dialog>
  )
}

export default MyEvents
