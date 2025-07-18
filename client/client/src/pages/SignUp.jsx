import { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const logoUrl = '/logo/Scope_logo.jpg';
const bgUrl = '/images/bg.jpg';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [message, setMessage] = useState(''); // Add message state for API feedback
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1].focus();
    if (e.key === 'ArrowRight' && index < 3) otpRefs.current[index + 1].focus();
    if (e.key === 'ArrowLeft' && index > 0) otpRefs.current[index - 1].focus();
  };

  const validateEmail = () => {
    if (!email) {
      setErrors({ ...errors, email: 'Email is required' });
      return false;
    }
    if (!email.endsWith('@charusat.edu.in')) {
      setErrors({ ...errors, email: 'Please use a valid @charusat.edu.in email address' });
      return false;
    }
    setErrors({ ...errors, email: '' });
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setErrors({ ...errors, password: 'Password is required' });
      return false;
    }
    setErrors({ ...errors, password: '' });
    return true;
  };

  const handleSendOtp = async () => {
    setTouched({ ...touched, email: true });
    if (validateEmail()) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', { email });
        setMessage(response.data.message);
        setOtpSent(true);
      } catch (error) {
        setMessage(error.response?.data?.error || 'An error occurred while sending OTP');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (validateEmail() && validatePassword()) {
      setIsLoading(true);
      try {
        const fullOtp = otp.join('');
        const response = await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp: fullOtp });
        setMessage(response.data.message);

        const setPasswordResponse = await axios.post('http://localhost:3000/api/auth/set-password', { email, password });
        setMessage(setPasswordResponse.data.message);
        // Optionally redirect to login page or clear form
        setEmail('');
        setOtp(['', '', '', '']);
        setPassword('');
        setOtpSent(false);
      } catch (error) {
        setMessage(error.response?.data?.error || 'An error occurred during signup');
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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
          <p className="text-sm text-gray-600">SCOPE</p>
        </div>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your @charusat.edu.in email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
              onBlur={() => setTouched({...touched, email: true})}
              className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-black transition-colors ${
                touched.email && errors.email ? 'border-red-500' : ''
              }`}
              disabled={otpSent || isLoading}
              aria-describedby="email-error"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {!otpSent ? (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                className={`w-full bg-teal-600 text-white rounded-xl px-6 py-3 font-semibold hover:bg-teal-700 transition duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">Login</a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">Enter OTP</label>
                <div className="flex justify-center gap-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-black transition-colors"
                      aria-label={`OTP digit ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-800">Create Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: '' });
                  }}
                  onBlur={() => setTouched({...touched, password: true})}
                  className={`w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 bg-white text-black transition-colors ${
                    touched.password && errors.password ? 'border-red-500' : ''
                  }`}
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
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          )}
          {message && <p className="text-center text-sm text-gray-600 mt-2">{message}</p>} {/* Display API message */}
        </form>
      </div>
    </div>
  );
}