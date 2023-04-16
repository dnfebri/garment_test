import React from 'react'

const PostViewDetail = ({data}) => {
  return (
    <div className="bg-white shadow-lg rounded-md border border-slate-200 mt-4">
      <div className='flex justify-between items-center'>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Detail Post </h2>
          </header>
        </div>
      <div className="relative overflow-x-auto">
        
        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{data.subtitle}</p>
          <div className='my-4'>
            <p className="font-normal text-gray-700 dark:text-gray-400">{data.subtitle}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default PostViewDetail