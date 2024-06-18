import React from 'react'
import { Outlet } from 'react-router-dom'
import PatientSideBar from './PatientSideBar'

const PatientLayout = () => {
  return (
    <React.Fragment>
         <div className="flex flex-row bg-blue-80 h-screen w-screen overflow-hidden">
            <PatientSideBar />
            <div className="flex-1">
      
              <div className="p-4">{<Outlet />}</div>
            </div>
         </div>
    </React.Fragment>
  )
}

export default PatientLayout
