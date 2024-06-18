
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorLayout from './components/DoctorLayout'
import Patients from './pages/Patients'
import Resources from './pages/Resources'
import Appointments from './pages/Appointments'
import Reports from './pages/Reports'
import PatientLayout from './components/PatientLayout'
import Profile from './pages/Profile'
import CarePlan from './pages/CarePlan'
import Progress from './pages/Progress'
import PatientReport from './pages/PatientReport'
import HealthData from './pages/HealthData'
import AllPatient from './pages/AllPatient'
import AllAppoitment from './pages/AllAppoitment'
import CareProvider from './pages/CareProvider'
import AllResources from './pages/AllResources'
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';

function App() {
  
// a comment 22
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="patients" element={<Patients />} />
          <Route path="resources" element={<Resources />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="careplan" element={<CarePlan />} />
          <Route path="healthData" element={<HealthData />} />
          <Route path="progress" element={<Progress />} />
          <Route path="report" element={<PatientReport />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="allPatients" element={<AllPatient />} />
          <Route path="careProviders" element={<CareProvider />} />
          <Route path="allappointments" element={<AllAppoitment />} />
          <Route path="allresources" element={<AllResources />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
