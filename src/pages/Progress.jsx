import { Line,Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { MdBloodtype } from "react-icons/md"
import { FaHeartPulse } from "react-icons/fa6";
import { RiMentalHealthFill } from "react-icons/ri";
import { TbHeartRateMonitor } from "react-icons/tb";
const dumData = [
  { id: 1, calories: 130, bodyWater: 60.5, exercisesDuration: 80, heartRate: 75, bloodPressure: 85, respLevel: 18, stressLevel: 55, regDate: '2024-05-23' },
  { id: 2, calories: 120, bodyWater: 70.8, exercisesDuration: 90, heartRate: 72, bloodPressure: 78, respLevel: 17, stressLevel: 64, regDate: '2024-05-24' },
  { id: 3, calories: 140, bodyWater: 65.2, exercisesDuration: 95, heartRate: 80, bloodPressure: 75, respLevel: 20, stressLevel: 66, regDate: '2024-05-12' },
  { id: 4, calories: 110, bodyWater: 75.2, exercisesDuration: 85, heartRate: 80, bloodPressure: 65, respLevel: 16, stressLevel: 77, regDate: '2024-05-16' },
  { id: 5, calories: 125, bodyWater: 72.2, exercisesDuration: 100, heartRate: 86, bloodPressure: 75, respLevel: 15, stressLevel: 89, regDate: '2024-05-20' },
  { id: 6, calories: 115, bodyWater: 70.2, exercisesDuration: 75, heartRate: 90, bloodPressure: 70, respLevel: 17, stressLevel: 73, regDate: '2024-05-05' },
  { id: 7, calories: 105, bodyWater: 80.2, exercisesDuration: 90, heartRate: 70, bloodPressure: 75, respLevel: 26, stressLevel: 85, regDate: '2024-05-23' },
  { id: 8, calories: 130, bodyWater: 82.2, exercisesDuration: 100, heartRate: 85, bloodPressure: 80, respLevel: 30, stressLevel: 72, regDate: '2024-05-17' },
  { id: 9, calories: 140, bodyWater: 85.2, exercisesDuration: 95, heartRate: 75, bloodPressure: 90, respLevel: 10, stressLevel: 65, regDate: '2024-05-12' },
  { id: 10, calories: 150, bodyWater: 88.2, exercisesDuration: 80, heartRate: 80, bloodPressure: 85, respLevel: 20, stressLevel: 76, regDate: '2024-05-10' },
  { id: 11, calories: 150, bodyWater: 88.2, exercisesDuration: 80, heartRate: 80, bloodPressure: 85, respLevel: 20, stressLevel: 76, regDate: '2024-05-19' },
];

const Progress = () => {
  const dummyData=dumData.slice(-7);
  const dates = dummyData.map(item => item.regDate);
  const glucose = dummyData.map(item => item.bodyWater);
  const pressure = dummyData.map(item => item.bloodPressure);
  const heartRate = dummyData.map(item => item.heartRate);
  const stress=dummyData.map(item=>item.stressLevel);

  const glucoseAverage = glucose.reduce((acc, curr) => acc + curr, 0) / dummyData.length;
const averageBodyPressure = pressure.reduce((acc, curr) => acc + curr, 0) / dummyData.length;
const averageHeartRate = heartRate.reduce((acc, curr) => acc + curr, 0) / dummyData.length;
const averageStress = stress.reduce((acc, curr) => acc + curr, 0) / dummyData.length;
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Blood Glucose',
        data: glucose,
        fill: false,
        borderColor: 'rgb(255, 0, 0)', // Blue
        lineTension: 0.5, // Curved line
      },
      {
        label: 'Blood Pressure',
        data: pressure,
        fill: false,
        borderColor: 'rgb(59 130 246)', // Yellow
        lineTension: 0.3, // Curved line
      },
      {
        label: 'Stress Level',
        data: stress,
        fill: false,
        borderColor: 'rgb(34 197 94)', // Teal
        lineTension: 0.5, // Curved line
      },
      {
        label: 'Heart Rate',
        data: heartRate,
        fill: false,
        borderColor: 'rgb(234 179 8)', // Purple
        lineTension: 0.5, // Curved line
      },
      
    ],
  };


  const barData = {
    labels: dates,
    datasets: [
      {
        label: 'Blood Glucose',
        data: glucose,
        backgroundColor: 'rgb(255, 0, 0)', // Blue
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1,
      },
      {
        label: 'Blood Pressure',
        data: pressure,
        backgroundColor: 'rgb(59 130 246)', // Yellow
        borderColor: 'rgb(59 130 246)',
        borderWidth: 1,
      },
      {
        label: 'Stress Level',
        data: stress,
        backgroundColor: 'rgb(34 197 94)', // Teal
        borderColor: 'rgb(34 197 94)',
        borderWidth: 1,
      },
      {
        label: 'Heart Rate',
        data: heartRate,
        backgroundColor: 'rgb(234 179 8)', // Purple
        borderColor: 'rgb(234 179 8)',
        borderWidth: 1,
      },
    ]
      
  };


  // Options object for Chart.js
  const options = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'YYYY-MM-DD',
          displayFormats: {
            day: 'YYYY-MM-DD'
          }
        },
        ticks: {
          source: 'labels'
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };

  return (
    <div className='flex flex-col h-full w-full p-2'>
   <div className='flex flex-row justify-between items-center'>
    <h1 className='text-blue-500 text-4xl font-bold'>Progress Tracking</h1>
    <div className='w-[300px] h-[80px] flex mt-4 flex-col bg-blue-300 rounded-lg'>
      <h1 className='text-lg text-white font-semibold ml-4 mt-2'>Dukundane Remy</h1>
      <h4 className='text-sm text-white font-medium ml-4'>Diabetes</h4>
    </div>
   </div>
    <h1 className='text-blue-500 text-2xl mt-2 mb-4 font-semibold'>DashBoard</h1>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-4'>
      <div className='bg-red-500 text-white p-4 rounded-lg shadow-md'>
      <MdBloodtype size={35} />
      <h3 className='text-lg'>Blood Glucose</h3>
      <p className='text-3xl font-bold'>{`${glucoseAverage.toFixed(2)} mg/dl`}</p>
      <p className='mt-1'>{glucoseAverage<70?"Low":glucoseAverage>100?"High":"Normal"}</p>
      </div>
      <div className='bg-blue-500 text-white p-4 rounded-lg shadow-md'>
      <TbHeartRateMonitor  size={35}/>
      <h3 className='text-lg'>Blood Pressure</h3>
      <p className='text-3xl font-bold'>{`${averageBodyPressure.toFixed(2)} mmHg`}</p>
      <p className='mt-1'>Normal</p>
      </div>
        <div className='bg-green-500 text-white p-4 rounded-lg shadow-md'>
        <RiMentalHealthFill size={35} />
          <h3 className='text-lg'>Stress level</h3>
          <p className='text-3xl font-bold'>{`${averageStress.toFixed(2)} ms`}</p>
          <p className='mt-1'>Normal</p>
        </div>
        <div className='bg-yellow-500 text-white p-4 rounded-lg shadow-md'>
        <FaHeartPulse size={35} />
          <h3 className='text-lg'>Heart Rate</h3>
          <p className='text-3xl font-bold'>{`${averageHeartRate.toFixed(2)} bpm`}</p>
          <p className='mt-1'>Normal</p>
        </div>
      </div>
      <h1 className='text-blue-500 text-2xl font-semibold'>Charts</h1>
    <div className='flex flex-row h-[80%] w-full mt-3 gap-3'>
      <div className='h-full w-full'>
        <Line data={data} options={options} className='bg-blue-100 p-4' />
      </div>
      <div className='h-full w-full'>
        <Bar data={barData} options={options}  className='bg-blue-100 p-4'/>
      </div>
    </div>
  </div>
  );
};



export default Progress
