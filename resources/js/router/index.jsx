import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Example from '../components/Example'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../components/PageNotFound'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Users from '../pages/users/Users'
import UserAdd from '../pages/users/UserAdd'
import Role from '../pages/users/Role'
import RoleAdd from '../pages/users/RoleAdd'
import RoleEdit from '../pages/users/RoleEdit'
import UserEdit from '../pages/users/UserEdit'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Example />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" >
          <Route index element={<Users />} />
          <Route path='add' element={<UserAdd />} />
          <Route path=':id' element={<UserEdit />} />
        </Route>

        <Route path="/role" >
          <Route index element={<Role />} />
          <Route path="add" element={<RoleAdd />} />
          <Route path=":id" element={<RoleEdit />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default index