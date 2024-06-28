import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidDonateBlood } from 'react-icons/bi';
import { FaAllergies, FaPhoneAlt, FaTransgender, FaUser, FaWeight } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { MdDateRange, MdSick } from 'react-icons/md';
import { SiDatefns } from 'react-icons/si';
import Modal from 'react-modal';

const AllPatient = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const token=sessionStorage.getItem('token');
  const [patients,setPatients]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [profileModal,setProfileModal]=useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openProfileModal=()=>setProfileModal(true);
  const closeProfileModal=()=>setProfileModal(false);
 
 useEffect(()=>{
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/patient/allPatients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setPatients(response.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchPatients();
 },[token])
  const sortedData = patients.sort((a, b) => {
    const dateA = new Date(a.patientId);
    const dateB = new Date(b.patientId);
    if (isSortingAsc) {
        return dateB - dateA;
    } else {
        return dateA - dateB;
    }
});
const filteredData = sortedData.filter(record =>
  record.names.toLowerCase().includes(searchTerm)
);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const handleSortButtonClick = () => {
    setIsSortingAsc(!isSortingAsc);
};
  return (
    <React.Fragment>
      <div className="flex flex-col h-full ">
                <h1 className="text-3xl font-bold mt-3 mb-6 text-blue-600 ml-2">
                Patients
                </h1>
                {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
                    )}
                <div className="flex flex-row justify-around items-center w-full">
                <button onClick={handleSortButtonClick} className="block bg-white-700 hoverbg-[#005D90] text-blue-700 border border-[#005D90]  py-2 px-8 rounded-[40px] my-[1rem]">Sort</button>
                    <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
                   <button onClick={openModal} className='text-blue-600 underline text-md font-semibold'>Add Patient</button>
                </div>
                {
                  loading&&<p>please wait.....</p>
                }
                <div className="relative overflow-y-auto h-[500px] sm:rounded-lg mt-4 mx-2">
       
                <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-sky-700 dark:text-white">
                <tr>
                        <th scope="col" className="px-6 py-3 text-sm text-center bg-[#005D90]">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm text-center  bg-[#005D90]">
                            Sickness
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Age
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Care Provider
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                {currentItems.map((record) => (
                <tr key={record.id} className="bg-white border hover:bg-[#E1E9F4] ">
                  <td className="px-4 py-2 whitespace-nowrap text-center">{record.patientId}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.names}</td>
                  <td className="px-4 whitespace-nowrap py-1text-center">{record.email}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.sickness}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.age}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.phoneNumber}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.assignedProvider}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">
                    <button onClick={openProfileModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</button>
                  </td>
                </tr>
              ))}
                    
                </tbody>
            </table>
      <div className="flex justify-between items-center mt-6 ">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-1 bg-[#005D90] text-white rounded-md">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-1 text-white rounded-md bg-[#005D90]">
          Next
        </button>
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
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Name</label>
            <input type="text" name='name'  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Email</label>
            <input type="email" name='email'  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber"  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Blood Group</label>
            <input type="text" name="bloodGroup" className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Birth Date</label>
            <input type="date" name="birthDate" className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Weight</label>
            <input type="text" name="weight" className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Gender</label>
            <select name="gender"  className="w-[90%] p-2 border rounded-lg" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Age</label>
            <input type="number" name="age"  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Address</label>
            <input type="text" name="address" className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Sickness</label>
            <input type="text" name="sickness"  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Allergies</label>
            <input type="text" name="allergies"  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-4 items-center">
            <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </Modal>
}  
{profileModal&&
            <Modal
      isOpen={openProfileModal}
      onRequestClose={closeProfileModal}
      contentLabel="Add New Patient"
      className="flex items-center h-[98%] w-[60%] bg-white p-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <div className="container w-full h-full p-3 bg-white">
    <h1 className="text-xl font-bold mb-1 text-blue-700">Patient Profile</h1>
      <div className="rounded-lg p-4 w-[65%]">        
            <div className="flex justify-between flex-col mb-1 ml-6 bg-white px-4 py-2 rounded-md">
            <h2 className="text-xl font-bold text-blue-700 mb-1">Personal Information</h2>
                <p><span className="font-semibold text-gray-800 ">ID:</span> </p>
                <p className='flex flex-row gap-2 items-center'><FaUser /><span className="font-semibold text-gray-800 ">Name: Dukundane Remy</span> </p>
                <p className='flex flex-row gap-2 items-center'><IoMdMail /><span className="font-semibold text-gray-800 ">Email: dukundaneremy2001@gmail.com</span> </p>
                <p className='flex flex-row gap-2 items-center'><FaPhoneAlt /><span className="font-semibold text-gray-800 ">Phone Number: 0788976543</span></p>
                <p className='flex flex-row gap-2 items-center'><FaLocationDot /><span className="font-semibold text-gray-800 ">Address: Nyarugenge, Kigali</span></p>
              </div>
              <div className='px-4 py-2 bg-white rounded-md pl-8 pb-2'>
              <h2 className="text-xl font-bold text-blue-700 mb-1">Over View</h2>
              <p className='flex flex-row gap-2 items-center'><MdDateRange /><span className="font-semibold text-gray-800 ">Birth Date: 1967-08-12</span></p>
              <p className='flex flex-row gap-2 items-center'><BiSolidDonateBlood /><span className="font-semibold text-gray-800 ">Blood Group: O+</span> </p>
              <p className='flex flex-row gap-2 items-center'><FaWeight /><span className="font-semibold text-gray-800 ">Weight: 70kg</span></p>
              <p className='flex flex-row gap-2 items-center'><FaTransgender /><span className="font-semibold text-gray-800 ">Gender: Male</span></p>
              <p className='flex flex-row gap-2 items-center'><SiDatefns /><span className="font-semibold text-gray-800 ">Age: 57</span></p>
              
              </div>
            <div className="px-4 py-2 bg-white pl-8 pb-2">
            <h2 className="text-xl font-bold text-blue-700 mb-1">Medical Information</h2>
              <p className='flex flex-row gap-2 items-center'><MdSick /><span className="font-semibold text-gray-800 ">Sickness: Diabetes</span></p>
              <p className='flex flex-row gap-2 items-center'><FaAllergies /><span className="font-semibold text-gray-800 ">Allergies: None</span></p>
            </div>
            <div className='mb-2'>
            <label className="block font-semibold text-gray-700">HealthCare Provider</label>
            <select name="provider"  className="w-[90%] p-2 border rounded-lg" required>
              <option value="">Select Health Care Provider</option>
              <option value="Male">Dr Kamali</option>
              <option value="Female">Dr Kalisa</option>
            </select>
          </div>
          <div className="flex justify-start gap-4 mt-6">
            <button type="button" onClick={closeProfileModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-lg">Save</button>
          </div>
        </div>
    </div>

    </Modal>
}
      </div>
</React.Fragment>
  )
}

export default AllPatient