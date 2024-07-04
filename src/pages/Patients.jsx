import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
const Patients = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [patients,setPatients]=useState([]);
  const email=sessionStorage.getItem('email');
  const token=sessionStorage.getItem('token');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
 


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
          sessionStorage.setItem("providerId",data.providerId);
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
                <tr key={record.patientId} className="bg-white border hover:bg-[#E1E9F4] ">
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
            
            
          
      </div>
      </React.Fragment>
  )
}

export default Patients