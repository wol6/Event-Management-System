import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/landingPage/Home'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import UserHome from './pages/landingPage/UserHome'
import Dashboard from './pages/admin/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
