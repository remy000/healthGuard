import React from 'react'
import AdminSideBar from './AdminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <React.Fragment>
        <div className="flex flex-row bg-blue-80 h-screen w-screen overflow-hidden">
            <AdminSideBar />
            <div className="flex-1">
      
              <div className="p-4">{<Outlet />}</div>
            </div>
         </div>
    </React.Fragment>
  )
}

export default AdminLayout
