import React from 'react'

const CarePlan = () => {
  return (
    <React.Fragment>
      <div className='flex flex-col h-full w-full mb-3'>
        <div className="px-4 flex flex-row w-full justify-between items-center">
          <h1 className='text-3xl text-blue-700 font-bold'>Care Plan</h1>
          <button className='bg-blue-500 text-white p-2 rounded-md'>Update</button>
        </div>
        <div className='flex flex-wrap w-full h-[90vh]'>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='shadow-lg border border-blue-100 flex flex-row h-full rounded-lg'>
              <img src="/src/assets/p1.webp" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-2 rounded-r-lg flex-grow'>
                <h3 className='text-lg font-bold mb-2 mx-2'>Personalized Plan</h3>
                <ul className='list-disc list-inside'>
                <p className='text-sm mx-2'>Engage in a 30-minute daily exercise routine that includes a mix of cardio, 
                  strength training, and flexibility exercises.
                   Follow a customized diet plan tailored to your specific nutritional needs, 
                   ensuring a balanced intake of proteins, carbohydrates, and healthy fats. 
                   Schedule a monthly checkup with your healthcare provider to monitor 
                   your progress and make necessary adjustments to your plan.</p>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='shadow-lg border border-blue-100 flex flex-row h-full rounded-lg'>
              <img src="/src/assets/p2.jpg" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-2 rounded-r-lg flex-grow'>
              <h3 className='text-lg font-bold mx-2 mb-2'>Medical Plan</h3>
                <p className='text-sm m-1'>Adhere to a strict medication schedule, taking prescribed medicines at the same time each day to manage your condition effectively:</p>
                <ul className='list-disc list-inside'>
                  <li className='text-sm mx-2'><strong>Morning (8:00 AM):</strong> Take 20mg of Lisinopril for blood pressure control.</li>
                  <li className='text-sm mx-2'><strong>Afternoon (12:00 PM):</strong> Take 500mg of Metformin to manage blood sugar levels.</li>
                  <li className='text-sm mx-2'><strong>Evening (8:00 PM):</strong> Take 10mg of Atorvastatin to lower cholesterol levels.</li>
                </ul> 
              </div>
            </div>
          </div>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='border border-blue-100 flex flex-row h-full shadow-lg rounded-lg'>
              <img src="/src/assets/p4.webp" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-4 rounded-r-lg flex-grow'>
              <h3 className='text-xl font-bold mb-2 mx-2'>Exercise Plan</h3>
                <p className='text-sm mx-2'>Incorporate a structured exercise regimen to enhance your physical health:</p>
                <ul className='list-disc list-inside'>
                  <li className='text-sm mx-2'><strong>Morning (7:00 AM):</strong> 20 minutes of cardio exercises, such as running or cycling.</li>
                  <li className='text-sm mx-2'><strong>Afternoon (1:00 PM):</strong> 30 minutes of strength training, focusing on major muscle groups.</li>
                  <li className='text-sm mx-2'><strong>Evening (6:00 PM):</strong> 15 minutes of flexibility exercises, including yoga or stretching.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-1/2 h-1/2 p-2'>
            <div className='border border-blue-100 flex flex-row h-full shadow-lg rounded-lg'>
              <img src="/src/assets/p5.jpg" alt="" className='w-[40%] h-full object-cover rounded-l-lg' />
              <div className='bg-white p-4 rounded-r-lg flex-grow'>
              <h3 className='text-xl font-bold mb-1 mx-2'>Dietary Plan</h3>
                <p className='text-sm mx-2'>Follow a balanced and nutritious diet to support your overall health:</p>
                <ul className='list-disc list-inside'>
                  <li className='text-sm mx-2'><strong>Breakfast (8:00 AM):</strong> Whole grain oatmeal with fruits and a glass of low-fat milk.</li>
                  <li className='text-sm mx-2'><strong>Lunch (12:30 PM):</strong> Grilled chicken salad with a variety of vegetables and olive oil dressing.</li>
                  <li className='text-sm mx-2'><strong>Dinner (7:00 PM):</strong> Baked salmon with quinoa and steamed broccoli.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CarePlan