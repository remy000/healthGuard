import React, { useEffect, useState } from 'react'
import { FaUser,FaPhoneAlt,FaWeight,FaTransgender,FaAllergies } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange,MdSick } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { SiDatefns } from "react-icons/si";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

const Profile = () => {
  const { id }=useParams();
  const token=sessionStorage.getItem('token');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [updateError,setUpdateError]=useState('');
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [loadin,setLoadin]=useState(false);
  const [patient,setPatient] =useState({
    patientId: 0,
    names: '',
    email: '',
    phoneNumber: '',
    bloodGroup: '',
    birthDate: '',
    weight: '',
    gender: '',
    age: 0,
    address: '',
    sickness: '',
    allergies: '',
  }
);
useEffect(()=>{
  const fetchPatient=async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/patient/findPatient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const data=response.data;
        setPatient({
          patientId:data.patientId,
          names:data.names,
          email:data.email,
          phoneNumber:data.phoneNumber,
          bloodGroup:data.bloodGroup,
          birthDate:data.birthDate,
          weight:data.weight,
          gender:data.gender,
          age:data.age,
          address:data.address,
          sickness:data.sickness,
          allergies:data.allergies
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }; 
  fetchPatient();
},[token,id])

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setPatient({
    ...patient,
    [name]: value
  });
};
const handleSubmit=async(e)=>{
  e.preventDefault();
  setLoadin(true);
  try {
    const response = await axios.put('http://localhost:8080/patient/updatePatient',patient, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(response.status===200){
      setLoadin(false);
      closeModal();
    }
    
  } catch (error) {
    setUpdateError(error.message);
    
  }

}
  return (
    <React.Fragment>
    <div className="container w-full h-full p-3 bg-gray-200">
    <div className='flex justify-between mx-6 mt-4'>
    <h1 className="text-4xl font-bold mb-6 text-blue-700">Patient Profile</h1>
    <button onClick={openModal} className='text-blue-600 underline text-md font-semibold'>Update</button>
    </div>
    {error&&(
      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
    )}
      <div className='flex flex-row'>
      {
                  loading&&<p>please wait.....</p>
                }
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
      {modalIsOpen&&
            <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Add New Patient"
      className="flex items-center h-[98%] w-[80%] bg-gray-100 p-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="rounded-lg flex flex-col justify-center h-full w-full items-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-700">Add New Patient</h2>
        <form className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
        {updateError&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{updateError}</p>
                    )}
           <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Name</label>
            <input type="text" name='patientId' value={patient.patientId} onChange={handleInputChange} disabled={true} className="w-[90%] p-2 border rounded-lg bg-gray-400" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Name</label>
            <input type="text" name='names'  value={patient.names} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Email</label>
            <input type="email" name='email' value={patient.email} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" value={patient.phoneNumber} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Blood Group</label>
            <input type="text" name="bloodGroup" value={patient.bloodGroup} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Birth Date</label>
            <input type="date" name="birthDate" value={patient.birthDate} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Weight</label>
            <input type="text" name="weight" value={patient.weight} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Gender</label>
            <select name="gender"  value={patient.gender} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Age</label>
            <input type="number" name="age"  value={patient.age} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Address</label>
            <input type="text" name="address" value={patient.address} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Sickness</label>
            <input type="text" name="sickness"  value={patient.sickness} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Allergies</label>
            <input type="text" name="allergies"  value={patient.allergies} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-4 items-center">
            <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded-lg"
            disabled={loadin}>{loading?"Loading":"Save"}</button>
          </div>
        </form>
      </div>
    </Modal>
} 
    </div>
</React.Fragment>
  )
}

export default Profile