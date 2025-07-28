import { Routes, Route } from 'react-router-dom';

// Context Providers
import AuthContextProvider from './context/AuthContextProvider';
import StudentContextProvider from './context/StudentContextProvider';

// Page Components
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import StudentProfileForm from './pages/student/StudentForm.jsx';
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import ApplyLeavePage from './pages/student/ApplyLeavePage.jsx';
import EnjoyedLeavePage from './pages/student/EnjoyedLeavePage.jsx';

// Utility Component for protecting routes
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student/StudentForm" element={<StudentProfileForm />} />
        <Route path="/student/apply-leave" element={<ApplyLeavePage />} />
        <Route path="/student/enjoyed-leave" element={<EnjoyedLeavePage />} />
        <Route 
            path="/student/dashboard" 
            element={
              <StudentContextProvider>
                <StudentDashboard />
              </StudentContextProvider>
            } 
          />
        

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* <Route 
            path="/student/dashboard" 
            element={
              <StudentContextProvider>
                <StudentDashboard />
              </StudentContextProvider>
            } 
          /> */}
          
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
