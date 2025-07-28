// src/pages/student/StudentDashboard.jsx

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DashboardContent from '../../components/student/DashboardContent';
import { StudentContext } from '../../context/StudentContext';

// The 'onApplyLeaveClick' prop is removed from here
export default function StudentDashboard() {
    const { isLoading } = useContext(StudentContext);
    const navigate = useNavigate(); // Get the navigate function from the hook

    // This function defines what happens when the button is clicked
    const handleApplyLeaveClick = () => {
        console.log('Apply Leave button clicked!'); // Debug log
        navigate('/student/apply-leave');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl font-medium text-gray-700">Loading Dashboard...</p>
            </div>
        );
    }

    // Pass the newly created handler to the DashboardContent component
    return <DashboardContent onApplyLeaveClick={handleApplyLeaveClick} />;
}