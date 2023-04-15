import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import { useCategory } from "../../app/useCategory";
import { useLocation } from "react-router-dom";

const Category = ({children} = '') => {
  const toastId = React.useRef(null);
  const notify = (message) => {
    if(! toast.isActive(toastId.current)) {
      toastId.current = toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  
  const {pathname} = useLocation();
  const { categorys, getCategory } = useCategory();
  
  const hendelDelete = async (idx) => {
    const confrim = confirm("apakah anda yakin?");
    if (confrim) {
      try {
        const response = await axios.delete(APP_URL_API+`category/${idx}`, _, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("access_token")}`
          }
        });
        const message = await response.data.message
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER
        });
        getCategory()
      } catch (error) {
        toast.warning(error.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }

  return (
    <Layout>
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="w-full md:max-w-md bg-white shadow-lg rounded-md border border-slate-200">
          <ToastContainer />
          <header className="px-5 py-3 h-14 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Category</h2>
            <Link to="/category/add" className={`mx-0.5 py-1 px-4 rounded-md text-white bg-green-500 ${pathname.includes('category/add') ? 'hidden' : ''}`}>Add</Link>
          </header>
          <div className="p-3">

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">No</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100">
                  {/* Row */}
                  {categorys.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <div className="text-left">{index + 1}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-left">{row.name}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          <Link to={`/category/${row.id}`}><button className="mx-0.5 py-0.5 px-4 rounded-md text-white bg-blue-500">Edit</button></Link>
                          <button onClick={() => hendelDelete(row.id)} className="mx-0.5 py-0.5 px-4 rounded-md text-white bg-red-500">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
        <div className="w-full md:max-w-md">
          {children}
        </div>
      </div>
    </Layout>
  )
}

export default Category