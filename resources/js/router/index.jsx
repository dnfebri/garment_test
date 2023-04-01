import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Example from '../components/Example';
import Dashboard from '../page/Dashboard';
import Login from '../page/Login';

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default index