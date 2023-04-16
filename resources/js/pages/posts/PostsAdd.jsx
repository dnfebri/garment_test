import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import InputModel1 from '../../components/input/InputModel1'
import { useUser } from '../../app/useUser'
import { useNavigate } from 'react-router-dom'
import { useCategory } from '../../app/useCategory'

const PostsAdd = () => {
  const {setAlert} = useUser()
  const navigate = useNavigate()
  const {getCategory, categorys} = useCategory()
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [filePdf, setFilePdf] = useState();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  console.log(filePdf);

  const hendelPost = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await axios.post(APP_URL_API+'post', inputs, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.status === 201) {
        const message = await response.data.message
        setAlert(true, message)
        navigate('/post')
      }

    } catch (error) {
      console.log(error);
      // setMessage(error.response.data);
      toast.warning(error.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  return (
    <Layout>
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="mx-auto w-full md:max-w-md bg-white shadow-lg rounded-md border border-slate-200">
          <header className="px-5 py-3 h-14 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-2xl text-slate-800 mx-auto">Create Post</h2>
          </header>
          {message.error && (
            <div className='text-center text-red-500 mt-4'>
              <p>{message.error}</p>
            </div>
          )}
          <div className="p-3">
          <form onSubmit={hendelPost}>
            {/* {isError && <p className="text-center mt-2">{massage}</p>} */}
            <div className="space-y-4 mt-4 px-4 pb-4 pt-2 border-t-2 border-neutral-400">
              <InputModel1 label="Title" type="text" name="title" id="title" value={inputs.title || ''} onChange={handleChange} />
              {message.title && (
                <p className='text-xs text-center text-red-500'>{message.title}</p>
              )}
              <InputModel1 label="Subtitle" type="text" name="subtitle" id="subtitle" value={inputs.subtitle || ''} onChange={handleChange} />
              {message.subtitle && (
                <p className='text-xs text-center text-red-500'>{message.subtitle}</p>
              )}

              <label className="block py-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
              <select 
                name='category_id' 
                id="category_id" 
                onChange={handleChange}
                value="0"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value='0'>Choose a Role User</option>
                {categorys.map((row, idx) => (
                  <option key={idx} value={row.id}>
                    {row.name}
                  </option>
                  ))}
              </select>
              {message.category_id && (
                <p className='text-xs text-center text-red-500'>{message.category_id}</p>
              )}

              <div>                
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  id="file_pdf" name='file_pdf' type="file" onChange={(e) => setFilePdf(e.target.files)} />
                {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
              </div>

              <div className="mt-4 py-2">
                <button type="submit" 
                  className={`
                    py-1 w-full text-center text-black font-bold rounded-lg 
                    ${isLoading ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-500
                    transition-all duration-300
                  `}
                >
                  {isLoading ? 'Loading...' : "Create"}
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

export default PostsAdd