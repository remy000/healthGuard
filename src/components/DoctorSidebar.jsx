/* eslint-disable react/prop-types */
import React from 'react'
import { DOCTOR_SIDEBAR_LINKS } from '../constants/Navigations'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import classNames from 'classnames'
const linkClasses = 'flex items-center  gap-2 font-light px-3 py-2 hover:bg-[#79A2E4] hover:no-underline active:bg-[#E1E9F4] rounded-sm text-base '

function SidebarLink({ item }) {
    const { pathname } = useLocation();
  
    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-[#79A2E4] text-white' : 'text-gray-300 font-semibold', linkClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}
const DoctorSidebar = () => {
    const providerNames=sessionStorage.getItem("names");
    const navigate=useNavigate();
    const logout=()=>{
        sessionStorage.clear();
        navigate("/");
    }
  return (
    <React.Fragment>
          <div className="bg-[#005D90] w-60 p-3 flex flex-col text-white">
                <div className="flex items-center justify-center py-2 mt-5  mb-5">
                    <img src="/src/assets/logo.png" className="w-[110px] h-[110px] rounded-[50%]" />
                </div>
                <div className="flex-1 py-8 flex flex-col gap-4">
                <h2 className='font-bold mb-10 ml-5 text-lg'>Dr.{providerNames}</h2>
                    {DOCTOR_SIDEBAR_LINKS.map((item) => (
                        <SidebarLink key={item.key} item={item} />
                    ))}
                </div>
                <div>
                        <button to="/home" className=" ml-10 mb-6 bg-[#005D90] text-white hover:bg-none hover:border-none flex flex-row gap-2 p-1" onClick={logout}
                        ><HiOutlineLogout size={25} />
                        Logout</button>
                    </div>
            </div>
    </React.Fragment>
  )
}

export default DoctorSidebar