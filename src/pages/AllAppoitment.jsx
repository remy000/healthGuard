import React, { useState } from 'react'

// comment
const AllAppoitment = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const data = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", Type: "in-person", Date: "2024-05-20", Status: "Pending" ,careProvider:"Dr Kamali" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", Type: "in-person", Date: "2024-06-02", Status: "Approved"  ,careProvider:"Dr Kamali"},
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", Type: "virtual", Date: "2024-03-20", Status: "Pending"  ,careProvider:"Dr Kamali"},
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com", Type: "virtual", Date: "2024-06-20", Status: "Approved" ,careProvider:"Dr Kamali" },
    { id: 5, name: "Sarah Davis", email: "sarah.davis@example.com", Type: "in-person", Date: "2024-06-20", Status: "Pending" ,careProvider:"Dr Kamali" },
    { id: 6, name: "Chris Lee", email: "chris.lee@example.com", Type: "virtual", Date: "2024-06-20", Status: "Approved"  ,careProvider:"Dr Kamali"},
    { id: 7, name: "Anna Scott", email: "anna.scott@example.com", Type: "in-person", Date: "2024-06-20", Status: "Rejected" ,careProvider:"Dr Kamali" },
    { id: 8, name: "Robert Miller", email: "robert.miller@example.com", Type: "virtual", Date: "2024-06-20", Status: "Rejected" ,careProvider:"Dr Kamali"},
    { id: 9, name: "Linda Taylor", email: "linda.taylor@example.com", Type: "virtual", Date: "2024-06-20", Status: "Pending"  ,careProvider:"Dr Kamali"},
    { id: 10, name: "Steven Anderson", email: "steven.anderson@example.com", Type: "Bin-person", Date: "2024-05-23", Status: "Approved" ,careProvider:"Dr Kamali" },
    { id: 11, name: "John Doe", email: "john.doe@example.com", Type: "in-person", Date: "2024-06-20", Status: "Rejected" ,careProvider:"Dr Kamali" },
    { id: 12, name: "Jane Smith", email: "jane.smith@example.com", Type: "virtual", Date: "2024-06-20", Status: "Pending" ,careProvider:"Dr Kamali" },
    { id: 13, name: "Emily Johnson", email: "emily.johnson@example.com", Type: "in-person", Date: "2024-06-20", Status: "Rejected"  ,careProvider:"Dr Kamali"},
    { id: 14, name: "Michael Brown", email: "michael.brown@example.com", Type: "virtual", Date: "2024-06-20", Status: "Approved" ,careProvider:"Dr Kamali" },
    { id: 15, name: "Sarah Davis", email: "sarah.davis@example.com", Type: "in-person", Date: "2024-06-20", Status: "Pending" ,careProvider:"Dr Kamali" },
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
                            Care Provider
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
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.careProvider}
                   
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
            
          
      </div>
</React.Fragment>
  )
}

export default AllAppoitment
