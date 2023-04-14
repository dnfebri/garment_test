import React from 'react'
import SideBar from '../components/layout/SideBar'
import Navbar from '../components/layout/Navbar'
import { useStore } from '../App/Store'

const Dashboard = () => {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation)
  const removeAllBears = useStore((state) => state.removeAllBears)
  return (
    <div className="flex h-screen overflow-hidden">

    <SideBar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <main>
          <div className="px-1 sm:px-2 lg:px-4 py-2 w-full max-w-9xl mx-auto">
            <div>
              <h1>iki</h1>
              <h1>{bears} around here...</h1>
              <button onClick={increasePopulation}>one up</button>
              <button onClick={removeAllBears}>reset</button>
            </div>
          </div>
        </main>
      </div>
      
    </div>
  )
}

export default Dashboard