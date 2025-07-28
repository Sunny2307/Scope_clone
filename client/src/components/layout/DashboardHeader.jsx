// dashboardheader.jsx

import React, { useContext } from 'react';
import { StudentContext } from '../../context/StudentContext';
import { FiLogOut } from 'react-icons/fi';

const scopeLogo = '/logo/SCOPE_LOGO.svg';

const DashboardHeader = () => {
    const { handleLogout } = useContext(StudentContext);

    return (
        <header className="bg-white px-6 flex justify-between items-center z-20 shrink-0 min-h-0 border-b border-gray-200 h-16" style={{ height: '64px' }}>
            <div className="flex items-center">
                <img 
                    src={scopeLogo} 
                    alt="Logo" 
                    style={{ height: '200px', width: 'auto' }} 
                />
            </div>
            <div className="flex items-center gap-4">
                {/* Border added */}
                <div 
                    className="px-5 py-2 text-base font-semibold rounded-full shadow-sm bg-gray-100 text-gray-900 border border-gray-300"
                >
                    Student Dashboard
                </div>
                
                {/* Border removed */}
                <button 
                    className="px-4 py-2 text-base font-semibold rounded-lg shadow-sm transition-colors
                               bg-gray-100 text-gray-900
                               hover:bg-gray-200
                               active:bg-gray-300
                               focus:outline-none"
                >
                    Reset Password
                </button>
                
                {/* Border removed */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-lg shadow-sm transition-colors
                               bg-red-100 text-red-900
                               hover:bg-red-200
                               active:bg-red-300
                               focus:outline-none"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
