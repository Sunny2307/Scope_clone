import React, { useState } from 'react';
import { StudentFormContext } from './StudentFormContext';

// In a real app, this would come from your main auth context or props
const userEmail = "john.doe@charusat.edu.in";

/**
 * Provides all state and logic for the multi-step student profile form.
 * It manages form data, step navigation, validation, and submission.
 */
export default function StudentFormContextProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        studentId: userEmail.split('@')[0],
        studentName: '',
        institute: 'P. D. Patel Institute of Applied Science',
        admissionDate: '',
        registrationDate: '',
        admissionYear: '',
        currentSemester: '',
        gender: '',
        birthDate: '',
        admissionCastCategory: '',
        actualCastCategory: '',
        nationality: 'Indian',
        profilePhoto: null,
        localAddress: '',
        permanentAddress: '',
        country: 'India',
        mobileNo: '',
        guardianMobileNo: '',
        guardianEmail: '',
        personalEmail: '',
        institutionalEmail: '',
        isHandicapped: false,
        disability: '',
        belongsToSamaj: false,
        hostelNameAddress: '',
        nameOfGuide: '',
        ugcId: '',
        scholarshipAmount: '',
        contingencyAmount: '',
        scholarshipType: '',
        aadhaarNumber: '',
        pancardNumber: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        }
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateStep = () => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.studentId) newErrors.studentId = 'Student ID is required';
            if (!formData.studentName) newErrors.studentName = 'Student name is required';
            // Removed validation for admissionDate as it is now disabled.
            if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
        } else if (currentStep === 2) {
            if (!formData.localAddress) newErrors.localAddress = 'Local address is required';
            if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent address is required';
            if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
            if (!/^\d{10}$/.test(formData.mobileNo)) newErrors.mobileNo = 'Mobile number must be 10 digits';
            if (!formData.personalEmail) newErrors.personalEmail = 'Personal email is required';
            if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) newErrors.personalEmail = 'Personal email is invalid';
            if (!formData.institutionalEmail) newErrors.institutionalEmail = 'Institutional email is required';
            if (!/\S+@\S+\.\S+/.test(formData.institutionalEmail)) newErrors.institutionalEmail = 'Institutional email is invalid';
        } else if (currentStep === 4) {
            // Added validation for Aadhaar and Pancard numbers.
            if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar Number is required';
            if (!formData.pancardNumber) newErrors.pancardNumber = 'Pancard Number is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            if (currentStep < 5) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            setIsSubmitting(true);
            console.log('Form Data Submitted:', formData);
            // Mock API call
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
            }, 2000);
        }
    };

    const ctxValue = {
        currentStep,
        formData,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        nextStep,
        prevStep,
        handleSubmit,
        userEmail,
    };

    return (
        <StudentFormContext.Provider value={ctxValue}>
            {children}
        </StudentFormContext.Provider>
    );
}
