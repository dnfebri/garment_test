import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../../app/useUser";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const toastId = React.useRef(null);
  const {setAlert, isSuccess, message} = useUser()
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const getUsers = async() => {
    try {
      const response = await axios.get(APP_URL_API+'users', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await response.data;
      setUsers(data.data)
      setRoles(data.dataRole)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getUsers()
    if (isSuccess) {
      if(! toast.isActive(toastId.current)) {
        toastId.current = toast.success(message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      setAlert(false, '')
    }
  }, [isSuccess, message, toast])
  return (
    <Layout>
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md border border-slate-200">
        <ToastContainer />
        <header className="px-5 py-3 h-14 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800">Users</h2>
          <Link to="/users/add" className={`mx-0.5 py-1 px-4 rounded-md text-white bg-green-500`}>Add</Link>
        </header>
        <div className="p-3">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {/* <span className="sr-only">Edit</span> */}
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((row, idx) => (
                  <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {row.email}
                    </th>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">
                      {roles.map((rowRole, i) => (
                        <span key={i}>
                          {rowRole.id == row.role_id && rowRole.name}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/users/${row.id}`}>
                        <p
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
