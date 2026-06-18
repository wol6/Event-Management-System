import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Register() {
    const navigate = useNavigate()
    const [userObj, setUserObj] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        isAdmin: false
    })

    function toggleIsAdmin() {
        setUserObj((prev) => {
            return { ...prev, isAdmin: !prev.isAdmin }
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setUserObj((prev) => {
            return { ...prev, [name]: value }
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            if (userObj.password !== userObj.cpassword) {
                alert("Passwords do not match!")
                return;
            }

            const { data: resp } = await api.post('/signup', userObj)

            if (resp.success) {
                navigate('/login')
            }
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Create Account
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userObj.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userObj.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userObj.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Retype Password
                        </label>
                        <input
                            type="password"
                            name="cpassword"
                            placeholder="Retype your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userObj.cpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex item-centre">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Is Admin
                        </label>
                        <input
                            type="checkbox"
                            placeholder="Retype your password"
                            className="mx-2"
                            checked={userObj.isAdmin}
                            onChange={toggleIsAdmin}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* <p className="text-center text-sm text-gray-600 mt-6">
          <NavLink to='/login' href="/login" className="text-blue-600 hover:underline">
            Login here!
          </NavLink>
        </p> */}
            </div>
        </div>
    );
}

export default Register;