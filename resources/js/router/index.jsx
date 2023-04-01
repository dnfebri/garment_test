import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Example from '../components/Example';
import Dashboard from '../page/Dashboard';

const index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default index