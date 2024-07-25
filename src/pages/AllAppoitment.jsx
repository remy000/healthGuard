import axios from 'axios';
import React, { useEffect, useState } from 'react'

// comment
const AllAppoitment = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [appointments,setAppointments]=useState([]);
  const token=sessionStorage.getItem('token');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  
  useEffect(()=>{
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/appointment/allAppointment', {
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

    fetchdata();
  },[token])







  const sortedData = appointments.sort((a, b) => {
    const dateA = new Date(a.appointmentId);
    const dateB = new Date(b.appointmentId);
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
                {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm text-center">{error}</p>
                    )}
                <div className="flex flex-row justify-around items-center w-full">
                    <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
                    <button onClick={handleSortButtonClick} className="block hoverbg-white text-white bg-[#005D90]  py-2 px-8 rounded-[40px] my-[1rem]">Sort</button>
                </div>
                <div className="relative overflow-y-auto h-[500px] sm:rounded-lg mt-2 mx-2">
                 {loading&&<p>Loading....</p>}
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
                  <td className="px-4 py-2 whitespace-nowrap text-center">{record.appointmentId}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.names}</td>
                  <td className="px-4 whitespace-nowrap py-1text-center">{record.email}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.type}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.requestDate}</td>
                  <td className={
                    record.status === 'approved' ? 'text-green-600 font-medium text-center' :
                    record.status === 'rejected' ? 'text-red-600 font-medium text-center' :
              'text-black text-center'
            }>
              {record.status}
            </td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">Dr.{record.providerNames}
                   
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
