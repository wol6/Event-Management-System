import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import MyEvents from '../user/MyEvents'

function Header() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [openMyEvent,setOpenMyEvent] = useState(false)

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        if (user) {
            const userObj = JSON.parse(user)
            const name = userObj.isAdmin ? `${userObj.name} (ADMIN)` : `${userObj.name}`
            setUserName(name)
        }
    })

    function openDialog(){
        setOpenMyEvent(true)
    }

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
    return (
        <div>
            <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

                    <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        Event Management Admin
                    </h1>

                    <div className="flex-1 text-center md:text-right md:pr-4">
                        <span onClick={openDialog}
                        className='text-sm font-semibold tracking-wide uppercase text-gray-500 mr-4 underline cursor-pointer'>My Event</span>
                        <span className="rounded-full bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600 border border-gray-100 shadow-inner">
                            {userName}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="shrink-0 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <MyEvents openMyEvent={openMyEvent} setOpenMyEvent={setOpenMyEvent}/>
        </div>

    )
}

export default Header