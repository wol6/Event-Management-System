import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Login() {
    const navigate = useNavigate()
    const [loginObj, setLoginObj] = useState({
        email: "",
        password: "",
        isAdmin: false
    })

    function toggleIsAdmin() {
        setLoginObj((prev) => {
            return { ...prev, isAdmin: !prev.isAdmin }
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginObj((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data: resp } = await api.post('/signin', loginObj)
            console.log(resp)
            if(resp.success){
                sessionStorage.setItem('user',JSON.stringify(resp.user))
                resp.user.isAdmin ? navigate('/admin') : navigate('/user')
                
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Sign in to your account
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={loginObj.email}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={loginObj.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        {/* <label className="flex items-center gap-2">
                            <input type="checkbox"
                                checked={loginObj.isAdmin}
                                className="accent-blue-600"
                                onChange={toggleIsAdmin} />
                            Is Admin
                        </label> */}

                        {/* <a href="#" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </a> */}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Not yet registered?{" "}
                    <NavLink to='/register' className="text-blue-600 hover:underline">
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;