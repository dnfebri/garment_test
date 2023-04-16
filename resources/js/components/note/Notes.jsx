import React from 'react'

const Notes = ({data}) => {
  return (
    <div className="bg-white shadow-lg rounded-md border border-slate-200 mt-8">
      <div className='flex justify-between items-center'>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Notes</h2>
          </header>
        </div>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                  </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {row.action}
                    </th>
                    <td className="px-6 py-4">
                      {row.id}
                    </td>
                    <td className="px-6 py-4">
                      {row.description}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(row.created_at).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>

    </div>
  )
}

export default Notes;