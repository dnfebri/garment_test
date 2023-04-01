import React from 'react'
import Layout from '../components/Layout'
// import WelcomeBanner from '../components/partials/dashboard/WelcomeBanner';
// import DashboardAvatars from '../components/partials/dashboard/DashboardAvatars';
// import FilterButton from '../components/partials/actions/FilterButton';
// import Datepicker from '../components/partials/actions/Datepicker';

const Dashboard = () => {
  return (
    <Layout>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          Dashboard               
        </div>

      </div>
    </Layout>
  )
}

export default Dashboard