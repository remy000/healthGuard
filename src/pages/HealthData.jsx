import React, { useState } from 'react'
import { FaHandHoldingWater,FaHeartbeat } from "react-icons/fa";
import { FaHeartPulse, FaPersonRunning } from "react-icons/fa6";
import { MdBloodtype, MdEnergySavingsLeaf } from "react-icons/md";
import { RiMentalHealthFill } from 'react-icons/ri';
import { TbHeartRateMonitor } from 'react-icons/tb';
const dummyData = [
  { id: 1, calories: 2000, bodyWater: 60.5, exercisesDuration: 30, heartRate: 75, bloodPressure: 120, respLevel: 18, stressLevel: 5, regDate: '2024-05-23' },
  { id: 2, calories: 1800, bodyWater: 59.8, exercisesDuration: 45, heartRate: 72, bloodPressure: 118, respLevel: 17, stressLevel: 4, regDate: '2024-05-24' },
  { id: 3, calories: 2200, bodyWater: 61.2, exercisesDuration: 50, heartRate: 80, bloodPressure: 125, respLevel: 20, stressLevel: 6, regDate: '2024-05-25' },
  // Add more dummy data as needed
];

const HealthData = () => {
  const [selectedDate, setSelectedDate] = useState('2024-05-23');
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const filteredData = dummyData.filter(item => item.regDate === selectedDate);
  return (
    <React.Fragment>
     <div className="container mx-auto py-3 h-full">
     <div className="mb-1 flex flex-row justify-between mx-4 my-4">
        <h1 className='text-3xl text-blue-700 font-bold'>Health Data</h1>
        <div className='w-[300px] h-[70px] flex flex-col bg-blue-500 rounded-lg'>
      <h1 className='text-lg text-white font-semibold ml-4 mt-1'>Dukundane Remy</h1>
      <h4 className='text-sm text-white font-medium ml-4'>Diabetes</h4>
    </div>
       
      </div>
       <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700">Select Date:</label>
        <input
          type="date"
          id="dateInput"
          name="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-[40%] sm:text-sm"
        />
      <h1 className="text-2xl text-blue-600 font-semibold my-3">Dashboard</h1>
    

      {/* Display data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="p-4 border border-gray-200 rounded-lg h-[150px] bg-blue-500 text-white">
          <h2 className="text-white mb-1 text-2xl font-bold">Calories</h2>
          <MdEnergySavingsLeaf size={35} />
          <p className="text-white text-2xl font-bold">{filteredData.length > 0 ? filteredData[0].calories : '-'}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg bg-blue-500 text-white">
          <h2 className="text-white mb-1 text-xl font-bold">Body Water</h2>
          <FaHandHoldingWater size={35} />
          <p className="text-white text-2xl font-bold">{filteredData.length > 0 ? filteredData[0].bodyWater : '-'}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg bg-blue-500 text-white">
          <h2 className="text-white mb-2 text-xl font-bold">Exercises Duration</h2>
          <FaPersonRunning size={35} />
          <p className="text-white text-2xl font-bold">{filteredData.length > 0 ? filteredData[0].exercisesDuration : '-'}</p>
        </div>
        <div className="p-4 border  border-gray-200 rounded-lg bg-blue-500 text-white">
          <h2 className="text-white mb-2 text-xl font-bold">Heart Rate</h2>
          <FaHeartbeat  size={35}/>
          <p className="text-white text-2xl font-bold">{filteredData.length > 0 ? filteredData[0].heartRate : '-'}</p>
        </div>
        </div>
        <h1 className="text-2xl text-blue-600 font-semibold my-2">Vital Signs</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-2'>
        <div className="p-4 border flex flex-row border-gray-200 rounded-md bg-blue-500">
        <TbHeartRateMonitor  size={50} className='mt-1 text-blue-200'/>
        <div className='flex flex-col ml-1'>
          <h2 className="text-white mb-2 text-2xl font-bold">Blood Pressure</h2>
          <p className="text-white text-xl font-bold">{filteredData.length > 0 ? filteredData[0].bloodPressure : '-'}</p>
          </div>
        </div>
        <div className="p-4 border flex flex-row border-gray-200 rounded-md bg-blue-500">
        <FaHeartPulse size={50} className='mt-1 text-orange-500'/>
        <div className='flex flex-col ml-1'>
          <h2 className="text-white mb-2 text-2xl font-bold">Heart Rate</h2>
          <p className="text-white text-xl font-bold">{filteredData.length > 0 ? filteredData[0].respLevel : '-'}</p>
          </div>
        </div>
        <div className="p-4 flex flex-row border border-gray-200 rounded-md bg-blue-500">
        <MdBloodtype size={50} className='mt-1 text-red-700'/>
          <div className='flex flex-col ml-1'>
          <h2 className="text-white mb-2 text-2xl font-bold">Glucose Level</h2>
          <p className="text-white text-xl font-bold">{filteredData.length > 0 ? filteredData[0].stressLevel : '-'}</p>
          </div>
        </div>
        <div className="p-4 border flex flex-row border-gray-200 rounded-md bg-blue-500">
        <RiMentalHealthFill size={50} className='mt-1 text-gray-600'/>
        <div className='flex flex-col ml-1'>
          <h2 className="text-white mb-2 text-2xl font-bold">Stress Level</h2>
          <p className="text-white text-xl font-bold">{filteredData.length > 0 ? filteredData[0].stressLevel : '-'}</p>
          </div>
        </div>
      </div>
    </div>
</React.Fragment>
  )
}

export default HealthData