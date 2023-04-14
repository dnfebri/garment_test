import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = async() => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await response.data.data;
      setUsers(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <Layout>
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row.email}
                </th>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.role_id}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
