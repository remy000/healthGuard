import React from 'react'
import { Link } from 'react-router-dom'

const UnAuth = () => {
    const role=sessionStorage.getItem("roles");
    return(
    <React.Fragment>
    <div className='flex ml-[25rem] flex-col '>
        <h1 className=' text-center  text-red-500 font-bold text-7xl mb-3'>403</h1>
        <h2 className='text-center text-3xl mt-3 font-medium text-gray-500'>You are Not Authorized to this Page!</h2>
        <Link to={role==="admin"?"/admin/allPatients":"/doctor/patients"} className='text-blue-700 mt-5 font-bold text-xl text-center'> Home</Link>
    </div>
</React.Fragment>
    )
}

export default UnAuth