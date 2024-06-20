import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AllPatient = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const data = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", sickness: "Flu", age: 29, phone: "555-1234" ,careProvider:"Yes"  },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", sickness: "Cold", age: 34, phone: "555-5678"  ,careProvider:"Yes" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", sickness: "Asthma", age: 40, phone: "555-9101" ,careProvider:"Yes"  },
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com", sickness: "Diabetes", age: 52, phone: "555-1121" ,careProvider:"No"  },
    { id: 5, name: "Sarah Davis", email: "sarah.davis@example.com", sickness: "Hypertension", age: 45, phone: "555-3141" ,careProvider:"No"  },
    { id: 6, name: "Chris Lee", email: "chris.lee@example.com", sickness: "Heart Disease", age: 50, phone: "555-5671"  ,careProvider:"Yes" },
    { id: 7, name: "Anna Scott", email: "anna.scott@example.com", sickness: "Arthritis", age: 60, phone: "555-8765"  ,careProvider:"No" },
    { id: 8, name: "Robert Miller", email: "robert.miller@example.com", sickness: "Chronic Pain", age: 55, phone: "555-4321" ,careProvider:"Yes" },
    { id: 9, name: "Linda Taylor", email: "linda.taylor@example.com", sickness: "Migraine", age: 42, phone: "555-6789" ,careProvider:"Yes"  },
    { id: 10, name: "Steven Anderson", email: "steven.anderson@example.com", sickness: "Back Pain", age: 38, phone: "555-0987" ,careProvider:"No"  },
    { id: 11, name: "John Doe", email: "john.doe@example.com", sickness: "Flu", age: 29, phone: "555-1234" ,careProvider:"Yes"  },
    { id: 12, name: "Jane Smith", email: "jane.smith@example.com", sickness: "Cold", age: 34, phone: "555-5678"  ,careProvider:"No" },
    { id: 13, name: "Emily Johnson", email: "emily.johnson@example.com", sickness: "Asthma", age: 40, phone: "555-9101"  ,careProvider:"Yes" },
    { id: 14, name: "Michael Brown", email: "michael.brown@example.com", sickness: "Diabetes", age: 52, phone: "555-1121" ,careProvider:"No"  },
    { id: 15, name: "Sarah Davis", email: "sarah.davis@example.com", sickness: "Hypertension", age: 45, phone: "555-3141" ,careProvider:"Yes"  },
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
  record.name.toLowerCase().includes(searchTerm)
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
                <div className="flex flex-row justify-around items-center w-full">
                <button onClick={handleSortButtonClick} className="block bg-white-700 hoverbg-[#005D90] text-blue-700 border border-[#005D90]  py-2 px-8 rounded-[40px] my-[1rem]">Sort</button>
                    <input type='text' placeholder='Search ...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-[40px] px-3 pl-11 pr-4' />
                   <Link to="" className='text-blue-600 underline text-md font-semibold'>Add Patient</Link>

                </div>
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
                  <td className="px-4 py-2 whitespace-nowrap text-center">{record.id}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.name}</td>
                  <td className="px-4 whitespace-nowrap py-1text-center">{record.email}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.sickness}</td>
                  <td className="px-4  whitespace-nowrap py-1 text-center">{record.age}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.phone}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">{record.careProvider}</td>
                  <td className="px-4 whitespace-nowrap py-1 text-center">
                    <button onClick={() => {}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</button>
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

export default AllPatient