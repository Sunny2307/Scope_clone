import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import StudentProfileForm from './pages/student/StudentForm.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/StudentForm" element={<StudentProfileForm />} />
      {/* Add more routes here as you add more pages */}
    </Routes>
  )
}

export default App
