import React from 'react'
import DoctorSidebar from './DoctorSidebar'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
  return (
    <React.Fragment>
         <div className="flex flex-row bg-blue-80 h-screen w-screen overflow-hidden">
            <DoctorSidebar />
            <div className="flex-1">
      
              <div className="p-4">{<Outlet />}</div>
            </div>
         </div>
    </React.Fragment>
  )
}

export default DoctorLayout