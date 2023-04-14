import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Example from '../components/Example'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../components/PageNotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Users from '../pages/Users'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Example />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default index