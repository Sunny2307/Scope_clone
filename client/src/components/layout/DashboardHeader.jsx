import React, { useContext } from 'react';
import { StudentContext } from '../../context/StudentContext';
import { FiLogOut } from 'react-icons/fi';

// Placeholder logo
const scopeLogo = '/logo/SCOPE_LOGO.svg';

const DashboardHeader = () => {
    // Logic like handleLogout is now part of this component
    const { handleLogout } = useContext(StudentContext);

    return (
        <header className="bg-white px-6 flex justify-between items-center z-20 shrink-0 min-h-0 border-b border-gray-200 h-16" style={{ height: '64px' }}>
            <div className="flex items-center gap-8">
                <img 
                    src={scopeLogo} 
                    alt="Logo" 
                    style={{ height: '200px', width: 'auto' }} 
                />
                <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
                <button className="text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-colors px-4 py-2 rounded-lg shadow-sm">Reset Password</button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;