import React, { useEffect, useState } from 'react'
import InputModel1 from '../components/input/InputModel1'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const getAuth = async() => {
    try {
      const getMe = await axios.get(APP_URL_API+'auth/me', {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      localStorage.removeItem('access_token');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      getAuth()
    }
  }, [getAuth])

  const hendelLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post(APP_URL_API+'auth/login', {
        ...inputs
      });
      localStorage.setItem('access_token', response.data.access_token);
      setMessage({});
      setIsLoading(false)
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response.data);
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 dark:bg-neutral-800">
      <div className="bg-white dark:bg-black p-4 rounded-lg w-80">
        <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="invert dark:invert-0 w-20 mx-auto" />
        {message.error && (
          <div className='text-center text-red-500 mt-4'>
            <p>{message.error}</p>
          </div>
        )}
        <form onSubmit={hendelLogin}>
          {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
          <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
            <InputModel1 label="Email" type="email" name="email" id="email" value={inputs.email || ''} onChange={handleChange} />
            {message.email && (
              <p className='text-xs text-center text-red-500'>{message.email}</p>
            )}
            <InputModel1 label="Password" type="password" name="password" id="password" value={inputs.password || ''} onChange={handleChange} />
            {message.password && (
              <p className='text-xs text-center text-red-500'>{message.password}</p>
            )}
            <div className="mt-4 py-2">
              <button type="submit" 
                className={`
                  py-1 w-full text-center text-black font-bold rounded-lg 
                  ${isLoading ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-500
                  transition-all duration-300
                `}
              >
                {isLoading ? 'Loading...' : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login