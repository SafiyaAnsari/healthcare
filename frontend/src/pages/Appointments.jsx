import { useAuth } from '../context/AuthContext';
import PatientAppointments from './PatientAppointments';
import DoctorAppointments from './DoctorAppointments';

const Appointments = () => {
  const { user } = useAuth();
  if (user?.role === 'provider') {
    return <DoctorAppointments />;
  }
  return <PatientAppointments />;
};

export default Appointments;


