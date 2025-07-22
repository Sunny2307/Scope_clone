import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";

/**
 * Provides authentication-related state and functions to its children.
 * It centralizes the logic for login, signup, OTP handling, and API calls.
 * This version merges token handling and navigation logic from the previous version.
 */

// Uses Vite environment variables for the API base URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AuthContextProvider({ children }) {
    const navigate = useNavigate();

    // --- State from your new provider ---
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const [signUpCredentials, setSignUpCredentials] = useState({ email: '', password: '' });
    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);
    const otpRefs = useRef([]);

    // --- Logic added from your old provider ---
    // State to signal that login was successful and navigation should occur.
    const [loginSuccess, setLoginSuccess] = useState(false);

    // This effect hook listens for a successful login and then navigates.
    // This is a reliable way to handle navigation after an async state update.
    useEffect(() => {
        if (loginSuccess) {
            // Navigate to the desired dashboard upon successful login.
            navigate('/student/dashboard');
        }
    }, [loginSuccess, navigate]);
    // --- End of added logic ---


    // --- Validation Logic (Unchanged) ---
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


    // --- Handler Functions ---

    // Login Handler (Updated with token logic)
    const handleLogin = async () => {
        setTouched({ email: true, password: true });
        if (validateEmail(loginCredentials.email) && validatePassword(loginCredentials.password)) {
            setIsLoading(true);
            try {
                // API call uses the environment variable base URL.
                const response = await axios.post(`${API_BASE_URL}/api/auth/login`, loginCredentials);
                
                // --- Logic added from old provider ---
                // Check for a token in the response and save it.
                if (response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    setMessage(response.data.message || 'Login successful!');
                    // Set loginSuccess to true to trigger the navigation effect.
                    setLoginSuccess(true);
                } else {
                    // Handle cases where login is successful but no token is sent.
                    setMessage(response.data.message || 'Login successful, but no token received.');
                }
                // --- End of added logic ---

            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred during login');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // SignUp Step 1: Send OTP (Unchanged)
    const handleSendOtp = async () => {
        setTouched(prev => ({...prev, email: true}));
        if (validateEmail(signUpCredentials.email)) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email: signUpCredentials.email });
                setMessage(response.data.message);
                setOtpSent(true);
            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred while sending OTP');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // SignUp Step 2: Verify OTP and Create User (Updated with correct navigation)
    const handleSignUp = async () => {
        setTouched({ email: true, password: true });
        if (validateEmail(signUpCredentials.email) && validatePassword(signUpCredentials.password)) {
            setIsLoading(true);
            try {
                const fullOtp = otp.join('');
                // First, verify the OTP
                await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { email: signUpCredentials.email, otp: fullOtp });

                // If OTP is correct, set the password
                const setPasswordResponse = await axios.post(`${API_BASE_URL}/api/auth/set-password`, signUpCredentials);
                setMessage(setPasswordResponse.data.message);
                
                // Reset form and navigate on success
                setSignUpCredentials({ email: '', password: '' });
                setOtp(['', '', '', '']);
                setOtpSent(false);

                // --- Updated Navigation from old provider ---
                // Navigate to the student form after successful sign-up.
                navigate('/student/StudentForm');

            } catch (error) {
                setMessage(error.response?.data?.error || 'An error occurred during signup');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // --- OTP Input Specific Handlers (Unchanged) ---
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
        // Login
        loginCredentials,
        setLoginCredentials,
        handleLogin,
        // Sign Up
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
