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
    </Routes>
  )
}

export default App
