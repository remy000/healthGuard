import React from 'react'

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
   <div className='flex justify-between mb-3'>
    <h1 className="text-4xl font-bold mb-6 text-blue-700">Patient Profile</h1>
    <button className='bg-white border-blue-200 py-1 px-4'>Update</button>
    <button className='bg-white border-blue-200 p-1'>Add new Care Plan</button>

    </div>
      <div className='flex flex-row'>
      <div className='w-[45%] h-[100vh] flex justify-center items-center'>
        <img src="/src/assets/unnamed.jpg" alt="" className='w-full h-[80%]' />

      </div>
      <div className="rounded-lg p-4 w-[65%]">
    
        <div className="flex flex-col gap-4">
        
            
            <div className="flex justify-between flex-col bg-white px-4 py-2 rounded-md shadow-md">
            <h2 className="text-xl text-center font-semibold text-gray-700 mb-2">Personal Information</h2>
              <div className='flex flex-row mb-2'>
                <img src="/src/assets/p1.webp" alt="" className='w-[100px] h-100px] object-cover rounded-md' />
                <div className='ml-6'>
                <p><span className="font-semibold text-gray-600">ID:</span> {patient.patientId}</p>
                <p><span className="font-semibold text-gray-600">Name:</span> {patient.names}</p>
                <p><span className="font-semibold text-gray-600">Email:</span> {patient.email}</p>
                <p><span className="font-semibold text-gray-600">Phone Number:</span> {patient.phoneNumber}</p>
                <p><span className="font-semibold text-gray-600">Address:</span> {patient.address}</p>

                </div>
              
              </div>
              </div>
              <div className='px-4 py-2 bg-white rounded-md shadow-md'>
              <h2 className="text-xl text-center font-semibold text-gray-700 mb-1">Over View</h2>
              <p><span className="font-semibold text-gray-600">Birth Date:</span> {new Date(patient.birthDate).toLocaleDateString()}</p>
              <p><span className="font-semibold text-gray-600">Blood Group:</span> {patient.bloodGroup}</p>
              <p><span className="font-semibold text-gray-600">Weight:</span> {patient.weight}</p>
              <p><span className="font-semibold text-gray-600">Gender:</span> {patient.gender}</p>
              <p><span className="font-semibold text-gray-600">Age:</span> {patient.age}</p>
              
              </div>
            <div className="px-4 py-2 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Medical Information</h2>
              <p><span className="font-semibold text-gray-600">Sickness:</span> {patient.sickness}</p>
              <p><span className="font-semibold text-gray-600">Allergies:</span> {patient.allergies}</p>
            </div>
        </div>
      </div>
      </div>
    </div>
</React.Fragment>
  )
}

export default Profile