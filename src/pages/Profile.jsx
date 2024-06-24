import React from 'react'
import { FaUser,FaPhoneAlt,FaWeight,FaTransgender,FaAllergies } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange,MdSick } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { SiDatefns } from "react-icons/si";

const Profile = () => {
  const patient = {
    patientId: 1,
    names: 'Dukundane Remy',
    email: 'dukundaneremy2001@gmail.com',
    phoneNumber: '0788654321',
    bloodGroup: 'O+',
    birthDate: '1985-05-15',
    weight: '75kg',
    gender: 'Male',
    age: 38,
    address: '123 kt,Nyarugenge,Kigali',
    sickness: 'Hypertension',
    allergies: 'Peanuts',
  }
  return (
    <React.Fragment>
    <div className="container w-full h-full p-3 bg-gray-200">
    <h1 className="text-4xl font-bold mb-6 text-blue-700">Patient Profile</h1>
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
              <div className='px-4 py-2 bg-white rounded-md shadow-md pl-8 pb-4'>
              <h2 className="text-xl text-center font-bold text-blue-700 mb-1">Over View</h2>
              <p className='flex flex-row gap-2 items-center'><MdDateRange /><span className="font-semibold text-gray-800 ">Birth Date:</span> {new Date(patient.birthDate).toLocaleDateString()}</p>
              <p className='flex flex-row gap-2 items-center'><BiSolidDonateBlood /><span className="font-semibold text-gray-800 ">Blood Group:</span> {patient.bloodGroup}</p>
              <p className='flex flex-row gap-2 items-center'><FaWeight /><span className="font-semibold text-gray-800 ">Weight:</span> {patient.weight}</p>
              <p className='flex flex-row gap-2 items-center'><FaTransgender /><span className="font-semibold text-gray-800 ">Gender:</span> {patient.gender}</p>
              <p className='flex flex-row gap-2 items-center'><SiDatefns /><span className="font-semibold text-gray-800 ">Age:</span> {patient.age}</p>
              
              </div>
            <div className="px-4 py-2 bg-white shadow-md rounded-md pl-8 pb-4">
            <h2 className="text-xl text-center font-bold text-blue-700 mb-4">Medical Information</h2>
              <p className='flex flex-row gap-2 items-center'><MdSick /><span className="font-semibold text-gray-800 ">Sickness:</span> {patient.sickness}</p>
              <p className='flex flex-row gap-2 items-center'><FaAllergies /><span className="font-semibold text-gray-800 ">Allergies:</span> {patient.allergies}</p>
            </div>
        </div>
      </div>
      </div>
    </div>
</React.Fragment>
  )
}

export default Profile