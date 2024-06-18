import React from 'react'
import { Bar,Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const dummyReports = [
  {
    reportId: 1,
    title: 'Annual Health Checkup',
    recommendations: 'Increase physical activity and reduce sugar intake.',
    improvements: 'Blood pressure has improved compared to last year.',
    reportDate: '2023-01-15',
    patientId: 101,
    patientNames: 'John Doe',
  },
  {
    reportId: 2,
    title: 'Quarterly Blood Test',
    recommendations: 'Continue current medication and monitor cholesterol levels.',
    improvements: 'Cholesterol levels are stable.',
    reportDate: '2023-03-20',
    patientId: 101,
    patientNames: 'John Doe',
  },
  {
    reportId: 3,
    title: 'Dietary Review',
    recommendations: 'Follow the new diet plan strictly.',
    improvements: 'Weight has reduced by 5kg in the last 3 months.',
    reportDate: '2023-06-05',
    patientId: 101,
    patientNames: 'John Doe',
  },
]

const PatientReport = () => {
  const currentDate = new Date();
  const reportsLastMonth = dummyReports.filter(report => {
    const reportDate = new Date(report.reportDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return reportDate >= oneMonthAgo && reportDate <= currentDate;
  }).length;

  // Data for Chart.js
  const chartData = {
    labels: dummyReports.map(report => new Date(report.reportDate).toLocaleDateString()),
    datasets: [
      {
        label: 'Reports Distribution',
        data: dummyReports.map(() => 1), // Each report counts as 1
        backgroundColor: dummyReports.map((_, index) => `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.6)`),
        borderColor: dummyReports.map((_, index) => `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 1)`),
        borderWidth: 1,
      }
    ]
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
  };



  // Options for Chart.js
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'week',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Reports',
        },
      },
    },
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <React.Fragment>
     <div className="container mx-auto p-4">
      <div className='flex flex-row justify-between mx-4'>
      <h2 className="text-3xl text-blue-600 font-bold mb-4">Patient Reports</h2>
      <button className='p-3 mb-4 mx-4 bg-[#005D90] text-white'>new Report</button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Reports Timeline</h2>
      <div className='flex flex-row justify-evenly'>
    
      <div className="mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Total Reports</h2>
          <Bar data={totalReportsData} options={barChartOptions} />
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Reports (Last Month)</h2>
          <Bar data={recentReportsData} options={barChartOptions} />
        </div>
      </div>
      <div className="overflow-x-auto">
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
            {dummyReports.map(report => (
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
    </div>
    </React.Fragment>
  )
}

export default PatientReport
