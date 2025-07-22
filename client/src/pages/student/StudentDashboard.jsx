import React, { useContext } from 'react';
import DashboardContent from '../../components/student/DashboardContent';
import { StudentContext } from '../../context/StudentContext';

export default function StudentDashboard() {
    const { isLoading } = useContext(StudentContext);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl font-medium text-gray-700">Loading Dashboard...</p>
            </div>
        );
    }

    return <DashboardContent />;
}
