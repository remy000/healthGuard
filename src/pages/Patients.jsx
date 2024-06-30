import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Link } from "react-router-dom";
const Patients = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [patients,setPatients]=useState([]);
  const email=sessionStorage.getItem('email');
  const token=sessionStorage.getItem('token');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [formData, setFormData] = useState({
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
    password: 'default'
  });


  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/provider/findProviderByEmail/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          const data = response.data;
          sessionStorage.setItem("names",data.names);
          fetchPatients(data.providerId);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPatients = async (providerId) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/patient/patientByProvider/${providerId}`, {
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

    fetchProvider();
  }, [email, token]);


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
const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit=async()=>{
    setLoading(true);
    try {
      const response=await axios.post("http://localhost:8080/patient/register",formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status===200){
        closeModal();
        setLoading(false);
      }
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
 
  return (
      <React.Fragment>
             <div className="flex flex-col h-full ">
                <h1 className="text-3xl font-bold text-center mt-3 mb-6 text-blue-600 ml-10">
                Patients
                </h1>
                {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
                    )}
                <div className="flex flex-row justify-around items-center w-full">
                <button onClick={handleSortButtonClick} className="block bg-white hoverbg-[#005D90] text-blue-700 border border-[#005D90]  py-2 px-8 rounded-[40px] my-[1rem]">Sort</button>
                    <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
                   <button onClick={openModal} className='text-blue-600 bg-white underline text-md font-semibold'>Add Patient</button>

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
                  <td className="px-4 whitespace-nowrap py-1 text-center">
                    <Link to={`/patient/${record.patientId}/profile`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</Link>
                  </td>
                </tr>
              ))}
                    
                </tbody>
            </table>
      <div className="flex justify-between items-center mt-6 ">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-[#005D90] text-white rounded-md">
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
        {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
                    )}
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Name</label>
            <input type="text" name='names'  value={formData.names} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Blood Group</label>
            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Birth Date</label>
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Weight</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Gender</label>
            <select name="gender"  value={formData.gender} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Age</label>
            <input type="number" name="age"  value={formData.age} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Sickness</label>
            <input type="text" name="sickness"  value={formData.sickness} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Allergies</label>
            <input type="text" name="allergies"  value={formData.allergies} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-4 items-center">
            <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded-lg"
            disabled={loading}>{loading?"Loading":"Save"}</button>
          </div>
        </form>
      </div>
    </Modal>
}
            
          
      </div>
      </React.Fragment>
  )
}

export default Patients