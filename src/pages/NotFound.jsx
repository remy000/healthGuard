import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <React.Fragment>
    <div className='flex flex-col ml-[25rem] flex-1' >
        <h1 className=' text-center text-red-500 font-bold text-7xl mb-3'>404</h1>
        <h2 className='text-center text-3xl mt-3 font-medium text-gray-500'>Page you are Trying to Access does not exist!</h2>
        <Link to="/" className='text-blue-700 mt-5 font-bold text-xl text-center' > Return</Link>
    </div>
</React.Fragment>
  )
}

export default NotFound
