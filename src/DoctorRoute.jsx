/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const DoctorRoute = ({children}) => {

    const role=sessionStorage.getItem("roles");
    const auth=sessionStorage.getItem("auths")==="true";
    if(role==="healthcare"&& auth){
        return children;
    }
    else if(auth && role!=="healthcare"){
        return <Navigate to="/unauthorized"/>
   }
    else{
        return <Navigate to="/"/>
  
}
  
}

export default DoctorRoute
