import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate, Link } from 'react-router-dom';

const logoUrl = '/logo/Scope_logo.jpg';
const bgUrl = '/images/bg.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [message, setMessage] = useState(''); // Add message state for API feedback

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!email.endsWith('@charusat.edu.in')) {
      newErrors.email = 'Please use a valid @charusat.edu.in email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (validate()) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        setMessage(response.data.message); // Display success message
        // Optionally clear fields or redirect (e.g., to a dashboard)
        setEmail('');
        setPassword('');
      } catch (error) {
        setMessage(error.response?.data?.error || 'An error occurred during login');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgUrl})`, backgroundColor: '#000' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={logoUrl} alt="Scope Logo" className="h-20 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
          <p className="text-sm text-gray-600">P. D. Patel Institute of Applied Science</p>
        </div>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your charusat email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
              onBlur={() => setTouched({ ...touched, email: true })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-black transition-colors"
              aria-describedby="email-error"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-800">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
              onBlur={() => setTouched({ ...touched, password: true })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-black transition-colors"
              aria-describedby="password-error"
            />
            {touched.password && errors.password && (
              <p id="password-error" className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-teal-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-teal-700 transition duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/" className="text-teal-600 hover:text-teal-700 font-medium">Sign Up</Link>
          </div>
          {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>} {/* Display API message */}
        </form>
      </div>
    </div>
  );
}
