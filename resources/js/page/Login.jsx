import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import jwt_decode from "jwt-decode";
import { LoginUser, reset, update } from '../components/features/authSlice';

// import LogoUA from "../../logo_ua.png";
import InputModel1 from '../components/utils/InputModel1';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [massage, setMassage] = useState('')
  // console.log(APP_URL_API);

  const [tokenLogin] = useState(Cookies.get('tokenLogin'));
  
  useEffect(()=>{
    if(tokenLogin){
      navigate("/dashboard");
    }
  }, [ tokenLogin ]);
  
  const login = async () => {
    setIsLoading(true);
    try {
      await axios.post(APP_URL_API + "/login", {
        email: inputs.email,
        password: inputs.password
      }).then(response => {
        setIsLoading(false)
        console.log(response.data.token);
        Cookies.set('tokenLogin', response.data.token);
        navigate("/dashboard");
      });
    } catch (error) {
      // console.log(error.response.data.massage);
      setIsLoading(false)
      setIsError(true)
      setMassage(error.response.data.massage)
    }
  }

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  function Auth(e) {
    e.preventDefault();
    login();

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-200">
      <div className="bg-white p-4 rounded-lg w-80">
        <form onSubmit={Auth}>
          {isError && <p className="text-center text-red-400 mt-2">{massage}</p>}
          <div className="mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
            <InputModel1 label="Email" type="text" name="email" id="email" value={inputs.email || ''} onChange={handleChange} />
            <InputModel1 label="Password" type="password" name="password" id="password" value={inputs.password || ''} onChange={handleChange} />
            <div className="mt-4 py-2">
              <button type="submit" className={`py-1 w-full text-center text-black font-bold rounded-lg ${isLoading ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-500`}>
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