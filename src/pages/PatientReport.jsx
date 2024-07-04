import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import Modal from 'react-modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const currentDate = new Date();
  const [error,setError]=useState('');
  const[loading,setLoading]=useState(false);
  const token=sessionStorage.getItem('token');
  const providerId=sessionStorage.getItem("providerId");
  const [reports,setReports]=useState([]);
  const { id }=useParams();
  const [report,setReport]=useState({
    title:'',
    recommendations:'',
    improvements:'',
    patientId:id,
    providerId:providerId
  })
useEffect(()=>{
  const fetchReports=async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/report/patientReports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status===200){
        const data=response.data;
        setReports(data);
      }
      
    }   catch (error) {
      setError(error.message);
    } 
  }
  fetchReports();
},[token,id]);
 
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const reportsLastMonth = reports.filter(report => {
    const reportDat = new Date(report.reportDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return reportDat >= oneMonthAgo && reportDat <= currentDate;
  }).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const totalReportsData = {
    labels: ['Total Reports'],
    datasets: [
      {
        label: 'Total Reports',
        data: [reports.length],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  const recentReportsData = {
    labels: ['Recent Reports (Last Month)'],
    datasets: [
      {
        label: 'Recent Reports',
        data: [reportsLastMonth],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      }
    ]
  }
  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value
    });
  };
  const validateReport = () => {
    if (!report.title || !report.recommendations || !report.improvements) {
        setError("All inputs are required");
        setLoading(false);
        return false;
    }
    return true;
};
  const saveReport=async(e)=>{
    setLoading(true);
    e.preventDefault();
    if (!validateReport()) {
      return;
  }
    try {
      const response = await axios.post('http://localhost:8080/report/saveReport',report, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status===200){
       closeModal();
       setLoading(false);
      }
      
    }   catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
     <div className="container mx-auto p-2">
      <div className='flex flex-row justify-between mr-4'>
      <h2 className="text-3xl text-blue-600 font-bold mb-2">Patient Reports</h2>
      
      <button onClick={openModal} className='p-2 mb-4 mx-4 bg-[#005D90] text-white'>new Report</button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Reports Timeline</h2>
      <div className='flex flex-row justify-evenly mb-2'>
        <div>
          <h2 className="text-lg font-bold mb-3">Total Reports</h2>
          <Bar data={totalReportsData} options={barChartOptions} />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-3">Recent Reports (Last Month)</h2>
          <Bar data={recentReportsData} options={barChartOptions} />
        </div>
      </div>
      <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Over view</h2>
      <table className="w-full text-sm text-left rtl:text-right">
      <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-sky-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-sm text-center bg-[#005D90]">Report Id</th>
              <th scope="col" className="px-6 py-3 text-sm text-center bg-[#005D90]">Title</th>
              <th scope="col" className="px-6 py-3 text-sm text-center bg-[#005D90]">Recommendations</th>
              <th scope="col" className="px-6 py-3 text-sm text-center bg-[#005D90]">Improvements</th>
              <th scope="col" className="px-6 py-3 text-sm text-center bg-[#005D90]">Report Date</th>
              <th scope='col' className="px-6 py-3 text-sm text-center bg-[#005D90]">Patient Name</th>
             
            </tr>
          </thead>
          <tbody>
            {currentItems.map(report => (
              <tr key={report.reportId} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{report.reportId}</td>
                <td className="py-2 px-4 border">{report.title}</td>
                <td className="py-2 px-4 border">{report.recommendations}</td>
                <td className="py-2 px-4 border">{report.improvements}</td>
                <td className="py-2 px-4 border">{new Date(report.reportDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{report.patientNames}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-3 ">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-1 bg-[#005D90] text-white rounded-md">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-1 text-white rounded-md bg-[#005D90]">
          Next
        </button>
      </div>
        {modalIsOpen&&
            <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Add New Patient"
      className="flex items-center h-[70%] w-[60%] bg-white px-6 py-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
    >
      <div className="rounded-lg flex flex-col justify-center h-full w-full items-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-700">Patient Report</h2>
        <form className="w-full h-full ml-8">
          {
            error&&(
              <p className='text-lg text-center text-red-600 font-semibold my-4'>{error}</p>
            )
          }
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Title</label>
            <textarea type="text" name='title' value={report.title} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Recommendations</label>
            <textarea type="email" name='recommendations' value={report.recommendations} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Improvements</label>
            <textarea type="text" name="improvements" value={report.improvements} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-6 mr-4 items-center">
            <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" onClick={saveReport} className="bg-blue-500 text-white px-4 py-1 rounded-lg" disabled={loading}>{loading?"loading....":'save'}</button>
          </div>
        </form>
      </div>
    </Modal>
}
    </div>
    </React.Fragment>
  )
}

export default PatientReport
