import React, { useState } from 'react'
import Modal from 'react-modal';

const Appointments = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const data = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", Type: "in-person", Date: "2024-05-20", Status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", Type: "in-person", Date: "2024-06-02", Status: "Approved" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", Type: "virtual", Date: "2024-03-20", Status: "Pending" },
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com", Type: "virtual", Date: "2024-06-20", Status: "Approved" },
    { id: 5, name: "Sarah Davis", email: "sarah.davis@example.com", Type: "in-person", Date: "2024-06-20", Status: "Pending" },
    { id: 6, name: "Chris Lee", email: "chris.lee@example.com", Type: "virtual", Date: "2024-06-20", Status: "Approved" },
    { id: 7, name: "Anna Scott", email: "anna.scott@example.com", Type: "in-person", Date: "2024-06-20", Status: "Rejected" },
    { id: 8, name: "Robert Miller", email: "robert.miller@example.com", Type: "virtual", Date: "2024-06-20", Status: "Rejected"},
    { id: 9, name: "Linda Taylor", email: "linda.taylor@example.com", Type: "virtual", Date: "2024-06-20", Status: "Pending" },
    { id: 10, name: "Steven Anderson", email: "steven.anderson@example.com", Type: "Bin-person", Date: "2024-05-23", Status: "Approved" },
    { id: 11, name: "John Doe", email: "john.doe@example.com", Type: "in-person", Date: "2024-06-20", Status: "Rejected" },
    { id: 12, name: "Jane Smith", email: "jane.smith@example.com", Type: "virtual", Date: "2024-06-20", Status: "Pending" },
    { id: 13, name: "Emily Johnson", email: "emily.johnson@example.com", Type: "in-person", Date: "2024-06-20", Status: "Rejected" },
    { id: 14, name: "Michael Brown", email: "michael.brown@example.com", Type: "virtual", Date: "2024-06-20", Status: "Approved" },
    { id: 15, name: "Sarah Davis", email: "sarah.davis@example.com", Type: "in-person", Date: "2024-06-20", Status: "Pending" },
  ];
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.id);
    const dateB = new Date(b.id);
    if (isSortingAsc) {
        return dateB - dateA;
    } else {
        return dateA - dateB;
    }
});
const filteredData = sortedData.filter(record =>
  record.Date.includes(searchTerm)
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
                <div className="relative overflow-y-auto h-[500px] sm:rounded-lg mt-2 mx-2">
       
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
                <tr key={record.id} className="bg-white border hover:bg-[#E1E9F4] ">
                  <td className="px-4 py-2 whitespace-nowrap text-center">{record.id}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.name}</td>
                  <td className="px-4 whitespace-nowrap py-1text-center">{record.email}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.Type}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.Date}</td>
                  <td className={
                    record.Status === 'Approved' ? 'text-green-600 font-medium' :
                    record.Status === 'Rejected' ? 'text-red-600 font-medium' :
              'text-black'
            }>
              {record.Status}
            </td>
                  <td className="px-2 whitespace-nowrap py-1 text-center">
                   <button onClick={openModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</button>
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
      <div className="rounded-lg flex flex-col gap-8 h-full w-full">
        <h2 className="text-2xl font-bold  text-blue-700 mb-3 mt-4">Appointment Review</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6'>
          <p className='font-medium mt-2'><span className='font-bold'>Patient Names</span>: Dukundane Remy</p>
          <p className='font-medium mt-2'><span className='font-bold'>Patient Email:</span> dukundaneremy2001@gmail.com</p>
          <p className='font-medium mt-2'><span className='font-bold'>Patient Phone: 0789615560</span></p>
          <p className='font-medium mt-2'><span className='font-bold'>Patient sickness: Diabetes</span></p>
          <p className='font-medium mt-2'><span className='font-bold'>Gender: Male</span></p>
          <p className='font-medium mt-2'><span className='font-bold'>Ages: 23</span></p>
          <p className='font-medium mt-2'><span className='font-bold'>Appointment Type: Virtual</span></p>
          <p className='font-medium mt-2'><span className='font-bold'>Appointment Date: 2024-06-23</span></p>
          <p className='text-medium mt-2'><span className='font-bold'>Appointment Reason: increase in sugar level</span></p>
        </div>
        <div className='mb-1'>
            <label className="block font-semibold text-gray-700 mb-1">Feedback</label>
            <textarea type="text" name="bloodGroup" className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='flex justify-around mt-3'>
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