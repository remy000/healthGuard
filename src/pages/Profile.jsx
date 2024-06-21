import React from 'react'
import { FaUser,FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Profile = () => {
  const patient = {
    patientId: 1,
    names: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    bloodGroup: 'O+',
    birthDate: '1985-05-15',
    weight: '75kg',
    gender: 'Male',
    age: 38,
    address: '123 Main St, Springfield, IL',
    sickness: 'Hypertension',
    allergies: 'Peanuts',
  }
  return (
    <React.Fragment>
    <div className="container w-full h-full p-3 bg-gray-200">
   <div className='flex justify-between my-3'>
    <h1 className="text-4xl font-bold mb-6 text-blue-700">Patient Profile</h1>
    <button className='px-3 py-1 h-[50px] mx-4 bg-white border border-blue-300'>update</button>

    </div>
      <div className='flex flex-row'>
      <div className='w-[45%] h-[100vh] flex justify-center mt-4'>
        <img src="/src/assets/unnamed.jpg" alt="" className='w-full h-[80%]' />

      </div>
      <div className="rounded-lg p-4 w-[65%]">
    
        <div className="flex flex-col gap-3">
        
            
            <div className="flex justify-between flex-col bg-white px-4 py-2 rounded-md shadow-md">
            <h2 className="text-xl text-center font-bold text-blue-700 mb-2">Personal Information</h2>
              <div className='flex flex-row mb-2'>
                <img src="/src/assets/p1.webp" alt="" className='w-[100px] h-100px] object-cover rounded-md' />
                <div className='ml-6'>
                <p><span className="font-semibold text-gray-800 ">ID:</span> {patient.patientId}</p>
                <p className='flex flex-row gap-2 items-center'><FaUser /><span className="font-semibold text-gray-800 ">Name:</span> {patient.names}</p>
                <p className='flex flex-row gap-2 items-center'><IoMdMail /><span className="font-semibold text-gray-800 ">Email:</span> {patient.email}</p>
                <p className='flex flex-row gap-2 items-center'><FaPhoneAlt /><span className="font-semibold text-gray-800 ">Phone Number:</span> {patient.phoneNumber}</p>
                <p className='flex flex-row gap-2 items-center'><FaLocationDot /><span className="font-semibold text-gray-800 ">Address:</span> {patient.address}</p>

                </div>
              
              </div>
              </div>
              <div className='px-4 py-2 bg-white rounded-md shadow-md'>
              <h2 className="text-xl text-center font-bold text-blue-700 mb-1">Over View</h2>
              <p><span className="font-semibold text-gray-800 ">Birth Date:</span> {new Date(patient.birthDate).toLocaleDateString()}</p>
              <p><span className="font-semibold text-gray-800 ">Blood Group:</span> {patient.bloodGroup}</p>
              <p><span className="font-semibold text-gray-800 ">Weight:</span> {patient.weight}</p>
              <p><span className="font-semibold text-gray-800 ">Gender:</span> {patient.gender}</p>
              <p><span className="font-semibold text-gray-800 ">Age:</span> {patient.age}</p>
              
              </div>
            <div className="px-4 py-2 bg-white shadow-md rounded-md">
            <h2 className="text-xl text-center font-bold text-blue-700 mb-4">Medical Information</h2>
              <p><span className="font-semibold text-gray-800 ">Sickness:</span> {patient.sickness}</p>
              <p><span className="font-semibold text-gray-800 ">Allergies:</span> {patient.allergies}</p>
            </div>
        </div>
      </div>
      </div>
    </div>
</React.Fragment>
  )
}

export default Profile