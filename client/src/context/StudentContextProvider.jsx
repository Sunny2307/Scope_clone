import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from './StudentContext';

export default function StudentContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const staticUserData = {
                name: 'Rahul Patel',
                collegeId: '20DCS001',
                department: 'Computer Science & Engineering',
                guide: 'Dr. Priya Sharma'
            };
            setUser(staticUserData);
            setIsLoading(false);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    const value = { user, isLoading, handleLogout };

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    );
}
