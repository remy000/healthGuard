/* eslint-disable react/prop-types */
import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PATIENT_SIDEBAR_LINKS } from '../constants/Navigations'
import { HiOutlineLogout } from 'react-icons/hi'
const linkClasses = 'flex items-center  gap-2 font-light px-3 py-2 hover:bg-[#79A2E4] hover:no-underline active:bg-[#E1E9F4] rounded-sm text-base '



function SidebarLink({ item }) {
    const { pathname } = useLocation()
    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-[#79A2E4] text-white' : 'text-gray-300','font-semibold', linkClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}
const PatientSideBar = () => {
    const providerNames=sessionStorage.getItem("names");
  return (
    <React.Fragment>
        <div className="bg-[#005D90] w-60 p-3 flex flex-col text-white">
                <div className="flex items-center ml-10 py-2 mt-10  mb-5">
                    <img src="/src/assets/logo.png" className="w-[110px] h-[110px] rounded-[50%]" />
                </div>
                <div className="flex-1 py-8 flex flex-col gap-4">
                <h2 className='font-bold mb-10 ml-5 text-lg'>Dr.{providerNames}</h2>
                    {PATIENT_SIDEBAR_LINKS.map((item) => (
                        <SidebarLink key={item.key} item={item} />
                    ))}
                </div>
                <div  
                    className={classNames(' text-white cursor-pointer', linkClasses)}>
                        <Link to="/doctor/patients" className="text-xl"><HiOutlineLogout /></Link>
                        Home
                    </div>
            </div>

    </React.Fragment>
  )
}

export default PatientSideBar