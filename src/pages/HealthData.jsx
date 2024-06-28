import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHandHoldingWater,FaHeartbeat } from "react-icons/fa";
import { FaHeartPulse, FaPersonRunning } from "react-icons/fa6";
import { MdBloodtype, MdEnergySavingsLeaf } from "react-icons/md";
import { RiMentalHealthFill } from 'react-icons/ri';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
const HealthData = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const { id }=useParams();
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const token=sessionStorage.getItem('token');
  const [healthData,setHealthData]=useState([]);
  const [names, setNames] = useState('');
  const [sickness, setSickness] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response = await axios.get(`http://localhost:8080/healthData/findPatientData/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(response.status===200){
          const data=response.data;
          setHealthData(data);
          if(data.length>0){
            const { names, sickness } = data[0];
            setNames(names);
           setSickness(sickness);
          }
        }
        
      }   catch (error) {
        console.log(error.message);
      } finally {
        console.log(false);
      }
    }
    fetchData();
  },[token,id]);
  

  const filteredData = healthData.filter(item => item.regDate === selectedDate);
  return (
    <React.Fragment>
     <div className="container mx-auto p-3 h-full">
     <div className="mb-1 flex flex-row justify-between mx-4 my-4">
        <h1 className='text-3xl text-blue-700 font-bold'>Health Data</h1>
        <div className='w-[300px] h-[70px] flex flex-col bg-blue-500 rounded-lg'>
      <h1 className='text-lg text-white font-semibold ml-4 mt-1'>{names}</h1>
      <h4 className='text-sm text-white font-medium ml-4'>{sickness}</h4>
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
          <p className="text-white text-xl font-bold">{filteredData.length > 0 ? filteredData[0].bloodGlucose : '-'}</p>
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