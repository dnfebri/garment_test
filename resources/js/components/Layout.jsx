import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getMe } from '../../features/authSlice'; 

import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import Cookies from 'js-cookie';

function Layout({children}) {
  const navigate = useNavigate();
  // const {isError} = useSelector((state => state.auth.authState));
  // // console.log('Dashboard', useSelector((state => state.auth))); /// INI di akses terus
  
  const [tokenLogin] = useState(Cookies.get('tokenLogin'));
  
  useEffect(()=>{
    if(!tokenLogin){
      navigate("/login");
    }
  }, [ tokenLogin ]);

  // useEffect(()=>{
  //   console.log('effec dasboard 2', isError);
  //   if(isError){
  //     navigate("/login");
  //   }
  // }, [isError, navigate]);
// console.log(dispatch(getMe()));

  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-1 sm:px-2 lg:px-4 py-2 w-full max-w-9xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}

export default Layout