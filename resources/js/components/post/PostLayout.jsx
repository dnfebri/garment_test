import React, { useEffect, useState } from 'react'
import { useCategory } from '../../app/useCategory';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostLayout = () => {

  const {getCategory, categorys} = useCategory();
  const [selectCategory, setSelectCategory] = useState('');
  const [search, setSearch] = useState('');
  const [posts, setPost] = useState([]);

  const getPosts = async (category = selectCategory) => {
    const response = await axios.get(APP_URL_API + `post?category=${category}&search=${search}`, {
      headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    });
    const data = await response.data.data
    setPost(data);
  }

  const hendelSelect = (e) => {
    setSelectCategory(e.target.value)
    getPosts(e.target.value)
  }

  // console.log(posts);
  useEffect(() => {
    getCategory();
    getPosts()
  }, []);

  const hendelSearch = (e) => {
    e.preventDefault();
    getPosts()
  }

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md border border-slate-200">
        {/* <ToastContainer /> */}
        <header className="px-5 py-3 border-b border-slate-100 md:flex justify-between items-center">
          <h2 className="font-semibold text-slate-800">All Posts</h2>
          {/* <Link to="/users/add" className={`mx-0.5 py-1 px-4 rounded-md text-white bg-green-500`}>Add</Link> */}
          <div className='sm:flex items-center sm:space-x-4'>
            <select 
              id="countries"
              onChange={hendelSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value=''>Choose a Category</option>
              {categorys.map((row, idx) => (
                <option key={idx} value={row.id}>{row.name}</option>
              ))}
            </select>

            {/* <label className="sr-only">Search</label> */}
            <div className="relative w-full">
              <form onSubmit={hendelSearch}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  name='search'
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                />
              </form>
            </div>
          </div>
        </header>
        <div className="p-3 relative overflow-x-auto shadow-md sm:rounded-lg">
          {posts.length < 1 ? (
            <div>
              <h1 className='text-center text-xl font-bold'>Post Not Found</h1>
            </div>
          ) : (
            <div className="flex flex-wrap justify-evenly gap-4">
              {posts.map((row, idx) => (
                <div 
                  key={idx}
                  className="block w-full max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <Link to={`/post/${row.uuid}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
                      {row.title}
                    </h5>
                  </Link>
                  <p className="font-normal text-gray-700 dark:text-gray-400">{row.subtitle}</p>
                  <p className="font-normal mt-4 text-gray-700 dark:text-gray-400">
                    {row.description.substring(0, 34)}{row.description.length >= 34 ? '...' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  )
}

export default PostLayout;