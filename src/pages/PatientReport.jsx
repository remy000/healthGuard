import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const dummyReports = [
  {
    reportId: 1,
    title: 'Annual Health Checkup',
    recommendations: 'Increase physical activity and reduce sugar intake.',
    improvements: 'Blood pressure has improved compared to last year.',
    reportDate: '2024-06-15',
    patientId: 101,
    patientNames: 'John Doe',
  },
  {
    reportId: 2,
    title: 'Quarterly Blood Test',
    recommendations: 'Continue current medication and monitor cholesterol levels.',
    improvements: 'Cholesterol levels are stable.',
    reportDate: '2024-06-12',
    patientId: 101,
    patientNames: 'John Doe',
  },
  {
    reportId: 3,
    title: 'Dietary Review',
    recommendations: 'Follow the new diet plan strictly.',
    improvements: 'Weight has reduced by 5kg in the last 3 months.',
    reportDate: '2024-03-05',
    patientId: 101,
    patientNames: 'John Doe',
  },
]

const PatientReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const currentDate = new Date();
  const reportsLastMonth = dummyReports.filter(report => {
    const reportDat = new Date(report.reportDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return reportDat >= oneMonthAgo && reportDat <= currentDate;
  }).length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyReports.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dummyReports.length / itemsPerPage);

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
        data: [dummyReports.length],
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

  return (
    <React.Fragment>
     <div className="container mx-auto p-2">
      <div className='flex flex-row justify-between mr-4'>
      <h2 className="text-3xl text-blue-600 font-bold mb-2">Patient Reports</h2>
      <button className='p-2 mb-4 mx-4 bg-[#005D90] text-white'>new Report</button>
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
    </div>
    </React.Fragment>
  )
}

export default PatientReport
