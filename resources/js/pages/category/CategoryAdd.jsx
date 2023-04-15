import React, { useState } from 'react'
import Category from './Category'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import InputModel2 from '../../components/input/InputModel2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCategory } from '../../app/useCategory'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const CategoryAdd = () => {

  const {getCategory} = useCategory()
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const createCategory = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(APP_URL_API+'category', inputs, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const message = await response.data.message
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
      getCategory();
      setInputs(values => ({...values, ['name']: ''}));
    } catch (error) {
      console.log(error);
      toast.warning(error.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  return (
    <Category>
      <div className="bg-white shadow-lg rounded-md border border-slate-200">
        <div className='flex justify-between items-center'>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Add</h2>
          </header>
          <Link to="/category" className="mx-4">
            <AiOutlineClose />
          </Link>
        </div>
        <div className="px-3">
          <ToastContainer />
          <div className="overflow-x-auto">
            <form onSubmit={createCategory}>
              <InputModel2 label="Categori" type="text" name="name" id="role" value={inputs.name || ''} onChange={handleChange} />
              <button type='submit' className="mx-0.5 my-4 py-1 px-4 rounded-md text-white bg-green-500">Save</button>
            </form>
          </div>
        </div>
      </div>
    </Category>
  )
}

export default CategoryAdd