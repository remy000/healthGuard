import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

const CarePlan = () => {
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { id }=useParams();
  const token=sessionStorage.getItem('token');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [uploadError,setUploadError]=useState('');
  const [hasPlan, setHasPlan] = useState(false);
  const [planId,setPlanId]=useState(0);
  const [plan,setPlan]=useState({
  personalizedPlan:'',
  medicalPlan:'',
  exercisePlan:'',
  dietPlan:'',
  });
  const splitByPeriod = (text) => {
    return text.split('.').filter(sentence => sentence.trim() !== '');
  };
  const personalizedPlanSentences = splitByPeriod(plan.personalizedPlan);
  const medicalPlanSentences = splitByPeriod(plan.medicalPlan);
  const exercisePlanSentences = splitByPeriod(plan.exercisePlan);
  const dietPlanSentences = splitByPeriod(plan.dietPlan);

  //fetching carePlan
   useEffect(()=>{
   const fetchPlan=async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/carePlan/patientPlan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status===200){
        const data=response.data;
        setPlan({
          personalizedPlan:data.personalizedPlan,
          medicalPlan:data.medicalPlan,
          exercisePlan:data.exercisePlan,
          dietPlan:data.dietPlan
        });
        setPlanId(data.planId);
        const hasRealData = Object.values(data).some(value => value !== '' && value !== 0);
        setHasPlan(hasRealData);
      }
      
    }   catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  fetchPlan();
   
   },[token,id]);
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlan({
      ...plan,
      [name]: value
    });
  };

 //create or add carePlan
 const addPlan=async(e)=>{
  e.preventDefault();
  try {
    const response = await axios.get('http://localhost:8080/carePlan/savePlan',plan, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(response.status===200){
      closeModal();
    }
    
  } catch (error) {
    setUploadError(error);
    
  }
 };
 const updatedPlan={
  planId,...plan
 }
 //update carePlan
 const updatePlan=async(e)=>{
  e.preventDefault();
  try {
    const response = await axios.put('http://localhost:8080/carePlan/updatePlan',updatedPlan, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(response.status===200){
      closeModal();
    }
    
  } catch (error) {
    setUploadError(error);
    
  }
 }


  return (
    <React.Fragment>
      <div className='flex flex-col h-full w-full mb-3'>
        <div className="px-4 flex flex-row w-full justify-between items-center mt-6">
          <h1 className='text-3xl text-blue-700 font-bold'>Care Plan</h1>
          {hasPlan ? (
        <button onClick={openModal} className='bg-blue-500 text-white p-2 rounded-md'>Update</button>
      ) : (
        <button onClick={openModal} className='bg-green-500 text-white p-2 rounded-md'>Add plan</button>
      )}
        </div>
       
        <div className='flex flex-wrap w-full h-[90vh]'>
        
        {hasPlan?(

        <>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='shadow-lg border border-blue-100 flex flex-row h-full rounded-lg'>
              <img src="/src/assets/p1.webp" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-2 rounded-r-lg flex-grow'>
                <h3 className='text-lg font-bold mb-2 mx-2'>Personalized Plan</h3>
                {personalizedPlanSentences.map((sentence, index) => (
                  <p className='text-sm mx-2' key={index}>
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='shadow-lg border border-blue-100 flex flex-row h-full rounded-lg'>
              <img src="/src/assets/p2.jpg" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-2 rounded-r-lg flex-grow'>
              <h3 className='text-lg font-bold mx-2 mb-2'>Medical Plan</h3>
              {medicalPlanSentences.map((sentence, index) => (
                  <p className='text-sm mx-2' key={index}>
                    {sentence.trim()}.
                  </p>
                ))}
               
              </div>
            </div>
          </div>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='border border-blue-100 flex flex-row h-full shadow-lg rounded-lg'>
              <img src="/src/assets/p4.webp" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-4 rounded-r-lg flex-grow'>
              <h3 className='text-xl font-bold mb-2 mx-2'>Exercise Plan</h3>
                <p className='text-sm mx-2'>
                {exercisePlanSentences.map((sentence, index) => (
                  <p className='text-sm mx-2' key={index}>
                    {sentence.trim()}.
                  </p>
                ))}
                </p>
               
              </div>
            </div>
          </div>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='border border-blue-100 flex flex-row h-full shadow-lg rounded-lg'>
              <img src="/src/assets/p5.jpg" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-4 rounded-r-lg flex-grow'>
              <h3 className='text-xl font-bold mb-1 mx-2'>Dietary Plan</h3>
              {dietPlanSentences.map((sentence, index) => (
                  <p className='text-sm mx-2' key={index}>
                    {sentence.trim()}.
                  </p>
                ))}
                
              </div>
            </div>
          </div>
          </>
          ):
          (
            <h2 className='text-3xl text-center mt-52 text-gray-400 ml-96 font-bold'>No data Found</h2>
          )}
        </div>
        
              
        {modalIsOpen&&
            <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Add New Patient"
      className="flex items-center h-[80%] w-[60%] bg-white px-6 py-3 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
    >
      <div className="rounded-lg flex flex-col justify-center h-full w-full items-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-700">Add Care Plan</h2>
        {
          uploadError&&(
            <p className='text-center text-red-500 text-sm'>{error}</p>
          )
        }
         {
          loading&&(
            <p className='text-center text-gray-500 text-sm'>Loading....</p>
          )
        }
        <form className="w-full h-full ml-8">
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Personalised care Plan</label>
            <textarea type="text" name='personalizedPlan' value={plan.personalizedPlan} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Medical Plan</label>
            <textarea type="email" name='medicalPlan' value={plan.medicalPlan} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Exercise Plan</label>
            <textarea type="text" name="exercisePlan" value={plan.exercisePlan} onChange={handleInputChange}  className="w-[90%] p-2 border rounded-lg" required />
          </div>
          <div className='mb-1'>
            <label className="block font-semibold text-gray-700">Dietary Plan</label>
            <textarea type="text" name="dietPlan" value={plan.dietPlan} onChange={handleInputChange} className="w-[90%] p-2 border rounded-lg" required />
          </div>
         
          <div className="flex justify-end gap-4 mt-6 items-center">
            <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-1 rounded-lg">Cancel</button>
            <button type="submit" onClick={hasPlan?addPlan:updatePlan} className="bg-blue-500 text-white px-4 py-1 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </Modal>
}
      </div>
    </React.Fragment>
  )
}

export default CarePlan