import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import InputModel1 from '../../components/input/InputModel1'
import { useUser } from '../../app/useUser'
import { useNavigate, useParams } from 'react-router-dom'

const UserEdit = () => {
  const {id} = useParams();
  const {setAlert} = useUser()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({});
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
  const handleChangeRole = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const getUserById = async (idx) => {
    try {
      const response = await axios.get(APP_URL_API+`users/${idx}`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      setInputs({
        name: response.data.data.name, 
        email: response.data.data.email,
        role_id: response.data.data.role_id
      });
    } catch (error) {
      console.log("error getRoleById", error);
    }
  }

  const getRoles = async () => {
    try {
      const response = await axios.get(APP_URL_API+`roles`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      setRoles(await response.data.data);
    } catch (error) {
      console.log("error getRole", error);
    }
  }

  useEffect(() => {
    getUserById(id)
    getRoles()
  }, [])

  const hendelUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(APP_URL_API+`users/${id}`, inputs, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const message = await response.data.message
      setAlert(true, message)
      navigate('/users')
    } catch (error) {
      console.log(error);
      setMessage(error.response.data);
      toast.warning(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  return (
    <Layout>
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="mx-auto w-full md:max-w-md bg-white shadow-lg rounded-md border border-slate-200">
          <header className="px-5 py-3 h-14 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-slate-800 mx-auto">Update User</h2>
          </header>
          {message.error && (
            <div className='text-center text-red-500 mt-4'>
              <p>{message.error}</p>
            </div>
          )}
          <div className="p-3">
          <form onSubmit={hendelUpdate}>
            {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
            <div className="space-y-4 mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
              <InputModel1 label="Name" type="text" name="name" id="name" value={inputs.name || ''} onChange={handleChange} />
              {message.name && (
                <p className='text-xs text-center text-red-500'>{message.name}</p>
              )}
              <InputModel1 label="Email" type="email" name="email" id="email" value={inputs.email || ''} onChange={handleChange} />
              {message.email && (
                <p className='text-xs text-center text-red-500'>{message.email}</p>
              )}

              <label className="block py-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
              <select 
                name='role_id' 
                id="role_id" 
                onChange={handleChangeRole}
                defaultValue="0"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value='0'>Choose a Role User</option>
                {roles.map((row, idx) => (
                  <option key={idx} value={row.id} selected={row.id === inputs.role_id ? true : false}>
                    {row.name}
                  </option>
                  ))}
              </select>
              {message.email && (
                <p className='text-xs text-center text-red-500'>{message.email}</p>
              )}

              <InputModel1 label="Password" type="password" name="password" id="password" value={inputs.password || ''} onChange={handleChange} />
              {message.password && (
                <p className='text-xs text-center text-red-500'>{message.password}</p>
              )}
              <InputModel1 label="Confirm" type="password" name="password_confirmation" id="password_confirmation" value={inputs.password_confirmation || ''} onChange={handleChange} />
              <div className="mt-4 py-2">
                <button type="submit" 
                  className={`
                    py-1 w-full text-center text-black font-bold rounded-lg 
                    ${isLoading ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-500
                    transition-all duration-300
                  `}
                >
                  {isLoading ? 'Loading...' : "Update"}
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserEdit