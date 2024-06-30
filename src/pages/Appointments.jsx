import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

const Appointments = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const closeModal = () => setModalIsOpen(false);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [appointments,setAppointments]=useState([]);
  const email=sessionStorage.getItem('email');
  const token=sessionStorage.getItem('token');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [selectedAppt,setSelectedAppt]=useState(null);
  const openModal = (appointment) => {
    setModalIsOpen(true);
    setSelectedAppt(appointment);
  }

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
          fetchPatients(data.providerId);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPatients = async (providerId) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/appointment/findProviderAppointment/${providerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [email, token]);
  const sortedData = appointments.sort((a, b) => {
    const dateA = new Date(a.requestDate);
    const dateB = new Date(b.requestDate);
    if (isSortingAsc) {
        return dateB - dateA;
    } else {
        return dateA - dateB;
    }
});
const filteredData = sortedData.filter(record =>
  record.requestDate.includes(searchTerm)
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
                <h1 className="text-3xl font-bold text-center mt-3 mb-6 text-blue-600 ml-10">
                Patients Appointments
                </h1>
                <div className="flex flex-row justify-around items-center w-full">
                    <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
                    <button onClick={handleSortButtonClick} className="block hoverbg-white text-white bg-[#005D90]  py-2 px-8 rounded-[40px] my-[1rem]">Sort</button>
                </div>
                {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm text-center">{error}</p>
                    )}
                <div className="relative overflow-y-auto h-[500px] sm:rounded-lg mt-2 mx-2">
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
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-sm  text-center bg-[#005D90]">
                            Action
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                {currentItems.map((record) => (
                <tr key={record.appointmentId} className="bg-white border hover:bg-[#E1E9F4] ">
                  <td className="px-4 py-2 whitespace-nowrap text-center">{record.appointmentId}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.names}</td>
                  <td className="px-4 whitespace-nowrap py-1text-center">{record.email}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.type}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.requestDate}</td>
                  <td className={
                    record.status === 'Approved' ? 'text-green-600 font-medium' :
                    record.status === 'Rejected' ? 'text-red-600 font-medium' :
              'text-black text-center'
            }>
              {record.status}
            </td>
                  <td className="px-2 whitespace-nowrap py-1 text-center">
                   <button onClick={()=>openModal(record)} className="font-medium text-blue-600 mr-2 dark:text-blue-500 hover:underline">view</button>
                   <button onClick={() => {}} className="font-medium text-red-600 dark:text-blue-500 hover:underline">delete</button>
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
      className="flex items-center h-[80%] w-[60%] bg-white px-6 py-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
    >
      <div className="rounded-lg flex flex-col h-full w-full">
        <h2 className="text-2xl font-bold  text-blue-700 mb-3 mt-5">Appointment Review</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-3 p-3'>
          <p className='font-medium mt-4'><span className='font-bold'>Patient Names</span>: {selectedAppt.names}</p>
          <p className='font-medium mt-4'><span className='font-bold'>Patient Email:</span> {selectedAppt.email}</p>
          <p className='font-medium mt-4'><span className='font-bold'>Appointment Type: {selectedAppt.type}</span></p>
          <p className='font-medium mt-4'><span className='font-bold'>Appointment Date: {selectedAppt.requestDate}</span></p>
          <p className='text-medium mt-4'><span className='font-bold'>Appointment Reason: {selectedAppt.description}</span></p>
        </div>
        <div className='mt-5'>
            <label className="block font-semibold text-gray-700 mb-2">Feedback</label>
            <textarea type="text" name="bloodGroup" className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='flex justify-around mt-5'>
            <button className='bg-green-700 px-4 py-2 text-white'>Approve</button>
            <button className='bg-red-700 px-4 py-2 text-white'>Decline</button>
            <button onClick={closeModal} className='bg-gray-500 px-4 py-2 text-white'>Cancel</button>
          </div>
          </div>
    </Modal>
}
      </div>
      </React.Fragment>
  )
}

export default Appointments