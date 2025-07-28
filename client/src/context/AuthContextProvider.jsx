import { useState, useRef, useEffect } from "react"; // Import useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({ children }) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const [signUpCredentials, setSignUpCredentials] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);
    const otpRefs = useRef([]);

    // --- Logic for navigation ---
    const [loginSuccess, setLoginSuccess] = useState(false);


    useEffect(() => {
        console.log(`--- NAVIGATION EFFECT TRIGGERED --- State of loginSuccess is now: ${loginSuccess}`);
        if (loginSuccess) {

            console.log("✅ Condition MET. Calling navigate('/student/dashboard')...");

            navigate('/student/dashboard');
        } else {
            console.log("-> Condition NOT met. Not navigating.");
        }
    }, [loginSuccess, navigate]);

    const validateEmail = (email) => {
        if (!email) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
            return false;
        }
        if (!email.endsWith('@charusat.edu.in')) {
            setErrors(prev => ({ ...prev, email: 'Please use a valid @charusat.edu.in email address' }));
            return false;
        }
        setErrors(prev => ({ ...prev, email: '' }));
        return true;
    };

    const validatePassword = (password) => {
        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password is required' }));
            return false;
        }
        setErrors(prev => ({ ...prev, password: '' }));
        return true;
    };


    const handleLogin = async () => {
        console.log("--- 1. handleLogin called. ---");
        setTouched({ email: true, password: true });
        if (validateEmail(loginCredentials.email) && validatePassword(loginCredentials.password)) {
            setIsLoading(true);
            try {

                // API call uses the environment variable base URL.
                const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginCredentials);
                
                // --- Logic restored from your old provider ---
                // This block now includes the dummy token fallback.
                if (response.data && response.data.token) {
                    console.log("Token found in response. Saving to localStorage.");
                    localStorage.setItem('token', response.data.token);
                    setMessage(response.data.message || 'Login successful!');
                    setLoginSuccess(true); // Trigger navigation
                } else {
                    // This is the fallback logic you requested.
                    console.warn("WARNING: No token in response. Proceeding with a dummy token for testing.");
                    localStorage.setItem('token', 'dummy-token-for-testing');
                    setMessage(response.data.message || 'Login successful, but no token received.');
                    setLoginSuccess(true); // Trigger navigation anyway
                }
                // --- End of restored logic ---

            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred during login');
                console.error("LOGIN FAILED: API call returned an error.", error);

            } finally {
                setIsLoading(false);
            }
        }
    };

    // --- YOUR OTHER ORIGINAL FUNCTIONS (UNCHANGED) ---
    const handleSendOtp = async () => {
        setTouched(prev => ({...prev, email: true}));
        if (validateEmail(signUpCredentials.email)) {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:3000/api/auth/signup', { email: signUpCredentials.email });
                setMessage(response.data.message);
                setOtpSent(true);
            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred while sending OTP');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSignUp = async () => {
        setTouched({ email: true, password: true });
        if (validateEmail(signUpCredentials.email) && validatePassword(signUpCredentials.password)) {
            setIsLoading(true);
            try {
                const fullOtp = otp.join('');

                await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email: signUpCredentials.email, otp: fullOtp });
                const setPasswordResponse = await axios.post(`${API_BASE_URL}/api/auth/set-password`, signUpCredentials);
                setMessage(setPasswordResponse.data.message);
                
                setSignUpCredentials({ email: '', password: '' });
                setOtp(['', '', '', '']);
                setOtpSent(false);
                navigate('/student/StudentForm');


            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred during signup');
            } finally {
                setIsLoading(false);
            }
        }
    };

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

    // Value provided to consuming components
    const ctxValue = {
        isLoading,
        message,
        errors,
        touched,
        setErrors,
        setTouched,
        loginCredentials,
        setLoginCredentials,
        handleLogin,
        signUpCredentials,
        setSignUpCredentials,
        otp,
        setOtp,
        otpSent,
        otpRefs,
        handleSendOtp,
        handleSignUp,
        handleOtpChange,
        handleOtpKeyDown
    };

    return (
        <AuthContext.Provider value={ctxValue}>
            {children}
        </AuthContext.Provider>
    );
}
