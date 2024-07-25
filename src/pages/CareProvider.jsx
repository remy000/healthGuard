import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidDonateBlood } from 'react-icons/bi';
import { FaPhoneAlt, FaTransgender, FaUser, FaWeight } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import Modal from 'react-modal';

const CareProvider = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const token=sessionStorage.getItem('token');
  const [data,setData]=useState([]);
  const [profileModal,setProfileModal]=useState(false);
  const [doctor,setDoctor]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [provider,setProvider]=useState({
    names:'',
    email:'',
    phoneNumber:'',
    gender:'',
    address:'',
    qualifications:'',
    experience:'',
    specialization:'',
    password:'',
  })
  const [saving,setSaving]=useState(false);
  const [savingError,setSavingError]=useState('');
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openProfileModal = (provider) => {
    setProfileModal(true);
    setDoctor(provider);
  };



  const closeProfileModal = () => setProfileModal(false);


  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/provider/allCareProviders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const filteredData = response.data.filter(provider => provider.roles !== 'admin');
          setData(filteredData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
   },[token])
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.providerId);
    const dateB = new Date(b.providerId);
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
 
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProvider({
    ...provider,
    [name]: value
  });
}


const handleSubmit=async()=>{
  setSaving(true);
  try {
    const response = await axios.post(`http://localhost:8080/provider/register`,provider,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      closeModal();
      setSaving(false);
    }
  } catch (error) {
    setSavingError(error.message);
    setSaving(false);
  } 
}

  return (
    <React.Fragment>
    <div className="flex flex-col h-full ">
                <h1 className="text-3xl font-bold mt-3 mb-6 text-blue-600 ml-2">
                Health Care Providers
                </h1>
                {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
                    )}
                <div className="flex flex-row justify-around items-center w-full">
                <button onClick={handleSortButtonClick} className="block bg-white-700 hoverbg-[#005D90] text-blue-700 border border-[#005D90]  py-2 px-8 rounded-[40px] my-[1rem]">Sort</button>
                    <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
                   <button onClick={openModal} className='text-blue-600 underline text-md font-semibold'>Add care provider</button>

                </div>
                <div className="relative overflow-y-auto h-[500px] sm:rounded-lg mt-4 mx-2">
                {
                  loading&&<p>please wait.....</p>
                }
       
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
                            Specialization
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                {currentItems.map((record) => (
                <tr key={record.providerId} className="bg-white border hover:bg-[#E1E9F4] ">
                  <td className="px-4 py-2 whitespace-nowrap text-center">{record.providerId}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.names}</td>
                  <td className="px-4 whitespace-nowrap py-1text-center">{record.email}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.specialization}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.gender}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.phoneNumber}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">
                    <button onClick={() => openProfileModal(record)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</button>
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
      contentLabel="Add New Provider"
      className="flex items-center h-[75%] w-[80%] bg-gray-100 p-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="rounded-lg flex flex-col justify-center h-full w-full items-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-700">Add New HealthCare Provider</h2>
        <form className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
        {savingError&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
                    )}
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Name</label>
            <input type="text" name='names' value={provider.names} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Email</label>
            <input type="email" name='email' value={provider.email} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" value={provider.phoneNumber} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Gender</label>
            <select name="gender" value={provider.gender} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Address</label>
            <input type="text" name="address" value={provider.address} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Qualifications</label>
            <input type="text" name="qualifications" value={provider.qualifications} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
         
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Work experience</label>
            <input type="text" name="experience" value={provider.experience} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Specialization</label>
            <input type="text" name="specialization"  value={provider.specialization} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">password</label>
            <input type="password" name="password"  value={provider.password} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-4 items-center">
            <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded-lg" disabled={saving}>
              {saving?'please wait....':"save"}</button>
          </div>
        </form>
      </div>
    </Modal>
}  
  {
    profileModal&&
<Modal
      isOpen={openProfileModal}
      onRequestClose={closeProfileModal}
      contentLabel="Add New Provider"
      className="flex items-center h-auto w-[90%] bg-white p-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
    >
       <div className="container w-full h-full p-3 bg-inherit">
      <div className='flex justify-between mx-6 my-4'>
    <h1 className="text-4xl font-bold mb-6 text-blue-700">HealthCare Provider Profile</h1>
    </div>
    
      <div className='flex flex-row'>
      
      <div className='w-[45%] h-[100%] flex justify-center mt-4'>
        <img src="/src/assets/doctors.jpg" alt="" className='w-full h-[60vh] object-cover mt-4' />

      </div>
      <div className="rounded-lg p-4 ml-8 w-[65%]">
    
        <div className="flex flex-col gap-4">
        
            
            <div className="flex justify-between flex-col bg-white p-6 rounded-md shadow-xl">
            <h2 className="text-3xl text-center font-bold text-blue-700 mb-2">Personal Information</h2>
              <div className='flex flex-col mb-2'>
             
                <p><span className="font-semibold text-gray-800 ">ID:</span> {doctor.providerId}</p>
                <p className='flex flex-row gap-3 mt-2 text-lg items-center'><FaUser /><span className="font-semibold text-gray-800 ">Name:</span> {doctor.names}</p>
                <p className='flex flex-row gap-3 mt-2 text-lg items-center'><IoMdMail /><span className="font-semibold text-gray-800 ">Email:</span> {doctor.email}</p>
                <p className='flex flex-row gap-3 mt-2 text-lg items-center'><FaPhoneAlt /><span className="font-semibold text-gray-800 ">Phone Number:</span> {doctor.phoneNumber}</p>
                <p className='flex flex-row gap-3 mt-2 text-lg items-center'><FaLocationDot /><span className="font-semibold text-gray-800 ">Address:</span> {doctor.address}</p>

              
              
              </div>
              </div>
              <div className='p-6 bg-white rounded-md shadow-xl'>
              <h2 className="text-3xl text-center font-bold text-blue-700 mb-1">Over View</h2>
              <p className='flex flex-row gap-3 mt-2 text-lg items-center'><FaTransgender /><span className="font-semibold text-gray-800 ">Gender:</span> {doctor.gender}</p>
              <p className='flex flex-row gap-3 mt-2 text-lg items-center'><MdDateRange /><span className="font-semibold text-gray-800 ">Experience</span> {doctor.experience}</p>
              <p className='flex flex-row gap-3 mt-2 text-lg items-center'><BiSolidDonateBlood /><span className="font-semibold text-gray-800 ">Qualification:</span> {doctor.qualifications}</p>
              <p className='flex flex-row gap-3 mt-2 text-lg items-center'><FaWeight /><span className="font-semibold text-gray-800 ">specialization:</span> {doctor.specialization}</p>
              
              </div>
        </div>
      </div>
      </div>
      </div>
      
    </Modal>
}  

      </div>
</React.Fragment>
  )
}

export default CareProvider
