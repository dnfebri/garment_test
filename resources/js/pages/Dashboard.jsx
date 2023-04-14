import React from 'react'
import { useStore } from '../app/Store'
import Layout from '../components/layout/Layout'

const Dashboard = () => {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation)
  const removeAllBears = useStore((state) => state.removeAllBears)
  return (
    <Layout>
      <div>
        <h1>iki</h1>
        <h1>{bears} around here...</h1>
        <button onClick={increasePopulation}>one up</button>
        <button onClick={removeAllBears}>reset</button>
      </div>
    </Layout>
  )
}

export default Dashboard