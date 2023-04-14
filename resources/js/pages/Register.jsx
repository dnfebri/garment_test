import React, { useState } from 'react'
import InputModel1 from '../components/input/InputModel1'

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const hendelRegister = async (e) => {
    e.preventDefault();
    console.log(inputs);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200 dark:bg-neutral-800">
      <div className="bg-white dark:bg-black p-4 rounded-lg w-80">
        <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="invert dark:invert-0 w-20 mx-auto" />
        <form onSubmit={hendelRegister}>
          {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
          <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
            <InputModel1 label="Name" type="text" name="name" id="name" value={inputs.name || ''} onChange={handleChange} />
            <InputModel1 label="Email" type="email" name="email" id="email" value={inputs.email || ''} onChange={handleChange} />
            <InputModel1 label="Password" type="password" name="password" id="password" value={inputs.password || ''} onChange={handleChange} />
            <InputModel1 label="Confirm" type="password" name="confmPassword" id="confmPassword" value={inputs.confmPasswordasd || ''} onChange={handleChange} />
            <div className="mt-4 py-2">
              <button type="submit" 
                className={`
                  py-1 w-full text-center text-black font-bold rounded-lg 
                  ${isLoading ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-500
                  transition-all duration-300
                `}
              >
                {isLoading ? 'Loading...' : "Register"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register