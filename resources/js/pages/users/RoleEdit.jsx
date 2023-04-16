import React, { useEffect, useState } from 'react'
import Role from './Role'
import InputModel2 from '../../components/input/InputModel2'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRole } from '../../app/useRole';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';

const RoleEdit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { getRoles } = useRole();
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const getRoleById = async (idx) => {
    try {
      const response = await axios.get(APP_URL_API+`roles/${idx}`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      setInputs({name: response.data.data.name});
    } catch (error) {
      console.log("error getRoleById", error);
    }
  }

  useEffect(() => {
    getRoleById(id)
  }, [])

  const updateRole = async(e) => {
    e.preventDefault();
    const confrim = confirm("apakah anda yakin?");
    if (confrim) {
      try {
        const response = await axios.put(APP_URL_API+`roles/${id}`, inputs, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("access_token")}`
          }
        });
        const message = await response.data.message
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER
        });
        getRoles();
      } catch (error) {
        console.log(error);
        toast.warning(error.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }
  return (
    <Role>
      <div className="bg-white shadow-lg rounded-md border border-slate-200">
        <div className='flex justify-between items-center'>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Edit</h2>
          </header>
          <Link to="/role" className="mx-4">
            <AiOutlineClose />
          </Link>
        </div>
        <div className="px-3">
          <ToastContainer />
          <div className="overflow-x-auto">
            <form onSubmit={updateRole}>
              <InputModel2 label="Role" type="text" name="name" id="role" value={inputs.name || ''} onChange={handleChange} />
              <button type='submit' className="mx-0.5 my-4 py-1 px-4 rounded-md text-white bg-green-500">Update</button>
            </form>
          </div>
        </div>
      </div>
    </Role>
  )
}

export default RoleEdit