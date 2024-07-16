import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token,setToken]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
 
  const handleLogin= async(e)=>{
    e.preventDefault();
      setLoading(true);
      if (!email ||!password) {
        setError('Enter all field');
        setLoading(false);
        return;
  }
  try {
    const response=await axios.post('http://localhost:8080/provider/authentication',{
      email,
      password
    },{
      headers:{
        'Content-Type':'application/json',
      },

    });
   
    if(response.status===200){
      const data=await response.data;
      setToken(data.token);
    }
    
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        setError("Invalid Credentials");
        setPassword('');
        setEmail('');
      } else if (error.response.status === 403) {
        setError("Forbidden");
        setPassword('');
        setEmail('');
      }
    } else if (error.request) {
      setError("No response received from server");
      setPassword('');
      setEmail('');
    
    } else {
      setError("Something went wrong");
      setPassword('');
      setEmail('');
    }
    setLoading(false);
  }
  
  };
  useEffect(()=>{
    if(token){
      const decodedToken=jwtDecode(token);
      const role=decodedToken.roles;
      if(role.includes && role.includes('healthcare')){

        sessionStorage.setItem('email',email);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem("auths", true);
        sessionStorage.setItem("roles",role);
        navigate("/doctor/patients");
        setLoading(false);
    }
    else if(role.includes && role.includes('admin')){

      sessionStorage.setItem('email',email);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem("auths", true);
      sessionStorage.setItem("roles",role);
      navigate("/admin/allPatients");
      setLoading(false);
  }
    
  
  }
    
  },[navigate, email, token]);

  

  return (
    <React.Fragment>
    <div className="flex w-screen h-[100vh] bg-[#5391b3]">
      <div className=" z-30 flex flex-row  bg-white w-[68%] h-[80%] mt-16 ml-[13rem]">
           <div className="flex">
           <img src="/src/assets/login.jpg" className="w-[800px] h-[95%%] rounded-e-3xl object-fill"/>
           <div className='z-20 absolute top-64 text-center ml-10'>
            <h1 className='text-white font-bold mb-5 text-5xl'>Health Guard</h1>
           <p className='text-white text-lg font-medium overflow-auto'>We Provide Home Care Service For Your Family</p>

           </div>
          
           </div>
            <div className="w-[80%]">
              <div className="w-[100%] p-10 mt-4 ">
                <h1 className="font-bold text-center text-3xl mb-5 text-blue-700">Welcome Back! </h1>
                <p className="py-2 text-left text-gray-800 font-semibold  text-lg mb-3">Enter your credentials to sign in!</p>
                <form>
                {error&&(
                      <p className="text-red-600 font-semibold m-2 text-sm">{error}</p>
                    )}
                  <div className="mb-3">
                    <label className="flex text-md font-semibold mb-3 text-gray-400">User Name </label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter your Username" className="  border border-blue-200 text-gray-500 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className="mb-3">
                    <label className="flex  text-md font-semibold mb-3 text-gray-400">Password </label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className="border border-blue-200 text-gray-500 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <button 
                   className="block bg-blue-700 hover:bg-blue-800 text-white w-full py-2 px-8 rounded-[40px] mt-[2rem]" onClick={handleLogin}
                    disabled={loading}>{loading?'please wait...':'Sign In'}</button>
                    {/* <p className=" mt-6 text-sm text-center">Not a Member? <Link className="text-blue-500" to="/register">create Account</Link></p> */}
                </form>
              </div>
            </div>
            </div>
          </div>
    </React.Fragment>
  )
}

export default Login