
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorLayout from './components/DoctorLayout'
import Patients from './pages/Patients'
import Resources from './pages/Resources'
import Appointments from './pages/Appointments'
// import Reports from './pages/Reports'
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
import DoctorRoute from './DoctorRoute';
import AdminRoute from './AdminRoute';
import NotFound from './pages/NotFound';
import UnAuth from './pages/UnAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/doctor" element={<DoctorRoute><DoctorLayout /></DoctorRoute>}>
          <Route path="patients" element={<DoctorRoute><Patients /></DoctorRoute>} />
          <Route path="resources" element={<DoctorRoute><Resources /></DoctorRoute>} />
          <Route path="appointments" element={<DoctorRoute><Appointments /></DoctorRoute>} />
          {/* <Route path="reports" element={<DoctorRoute><Reports /></DoctorRoute>} /> */}
        </Route>
        <Route path="/patient/:id" element={<PatientLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="careplan" element={<CarePlan />} />
          <Route path="healthData" element={<HealthData />} />
          <Route path="progress" element={<Progress />} />
          <Route path="report" element={<PatientReport />} />
        </Route>
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="allPatients" element={<AdminRoute><AllPatient /></AdminRoute>} />
          <Route path="careProviders" element={<AdminRoute><CareProvider /></AdminRoute>} />
          <Route path="allappointments" element={<AdminRoute><AllAppoitment /></AdminRoute>} />
          <Route path="allresources" element={<AdminRoute><AllResources /></AdminRoute>} />
        </Route>
        <Route path="/*" element={<NotFound />} />
        <Route path="/unauthorized" element={<UnAuth />} />
      </Routes>
    </Router>
  )
}

export default App
