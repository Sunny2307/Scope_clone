import React, { useState, useContext } from 'react';
import { StudentContext } from '../../context/StudentContext';
import { FiUser, FiCalendar, FiBookOpen, FiAward, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Footer from '../layout/Footer'; // Import the Footer component

// Placeholder logo - replace with your actual logo path
const scopeLogo = '/logo/Scope_logo.jpg';

// Reusable Header Component for the Dashboard
const DashboardHeader = () => {
    const { handleLogout } = useContext(StudentContext);
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center z-20 shrink-0">
            <div className="flex items-center gap-4">
                <img src={scopeLogo} alt="Logo" className="h-10" />
                <h1 className="text-xl font-bold text-gray-800 hidden md:block">Student Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
                {/* Updated Reset Password button styling */}
                <button className="text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg shadow-sm">
                    Reset Password
                </button>
                {/* Updated Logout button styling */}
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

// Reusable Sidebar Component
const Sidebar = ({ isSidebarOpen }) => {
    const navItems = [
        { name: 'Profile', icon: <FiUser /> },
        { name: 'Apply Leave', icon: <FiCalendar /> },
        { name: 'My Leaves', icon: <FiBookOpen /> },
        { name: 'Scholarship', icon: <FiAward /> },
    ];
    const activeItem = 'Profile'; // This can be made dynamic later with routing

    return (
        <aside className={`bg-white transition-all duration-300 ease-in-out md:block md:w-60 lg:w-64 shrink-0 md:shadow-none shadow-lg absolute md:relative z-30 h-full ${isSidebarOpen ? 'w-64 p-4' : 'w-0 p-0 md:w-60 lg:w-64 md:p-4'} overflow-hidden`}>
            <nav className="mt-4">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            {/* Updated link styling with larger font and new colors */}
                            <a href="#" className={`flex items-center gap-4 p-3 rounded-lg text-lg transition-colors ${item.name === activeItem ? 'bg-teal-100 text-teal-700 font-bold' : 'text-gray-700 hover:bg-gray-100 font-semibold'}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

// Main Dashboard Content Component
export default function DashboardContent() {
    const { user } = useContext(StudentContext);
    const [selectedLeaveType, setSelectedLeaveType] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock data based on your original file. This would also come from your backend.
    const leaveData = {
        CL: { balance: '12/30', history: [{ dates: '2024-11-15 to 2024-11-17', duration: '3 days', status: 'APPROVED BY DEAN' }, { dates: '2024-10-05 to 2024-10-06', duration: '2 days', status: 'PENDING' }] },
        DL: { balance: '3/10', history: [{ dates: '2024-11-10 to 2024-11-12', duration: '3 days', status: 'PENDING' }] },
        LWP: { balance: '2', history: [{ dates: '2024-11-05 to 2024-11-06', duration: '2 days', status: 'APPROVED BY OPERATOR' }] },
    };
    
    const otherScholarships = [
        { name: 'State Government Scholarship', amount: '₹15,000' },
        { name: 'Merit-Based Grant', amount: '₹5,000' },
    ];

    const getStatusClass = (status) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('approved')) return 'bg-green-100 text-green-800';
        if (lowerStatus.includes('pending')) return 'bg-yellow-100 text-yellow-800';
        if (lowerStatus.includes('rejected')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        // Updated main container to ensure it fills the screen
        <div className="w-screen h-screen bg-gray-50 flex flex-col">
            <DashboardHeader />
            <div className="flex flex-1 overflow-y-auto relative">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                         <div>
                            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'Student'}!</h2>
                            <p className="text-xs md:text-sm text-gray-500 mt-1 flex flex-wrap gap-x-2">
                                <span>ID: {user?.collegeId || '...'}</span>
                                <span className="hidden md:inline">|</span>
                                <span>Dept: {user?.department || '...'}</span>
                                <span className="hidden md:inline">|</span>
                                <span>Guide: {user?.guide || '...'}</span>
                            </p>
                        </div>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-md bg-gray-200 z-40">
                            {isSidebarOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Leave Status</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                {Object.entries(leaveData).map(([key, value]) => (
                                    <div key={key} onClick={() => setSelectedLeaveType(selectedLeaveType === key ? null : key)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedLeaveType === key ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <p className="font-semibold text-gray-700 text-sm">{key === 'CL' ? 'Casual Leave' : key === 'DL' ? 'Duty Leave' : 'Leave Without Pay'} ({key})</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{value.balance}</p>
                                    </div>
                                ))}
                            </div>
                            {selectedLeaveType && (
                                <div className="animate-fade-in">
                                    <h4 className="font-bold text-md mb-2">{selectedLeaveType} History</h4>
                                    <div className="overflow-x-auto rounded-lg border">
                                        <table className="min-w-full bg-white">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Dates</th>
                                                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Duration</th>
                                                    <th className="py-2 px-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leaveData[selectedLeaveType].history.map((leave, i) => (
                                                    <tr key={i} className="border-t">
                                                        <td className="py-3 px-4 text-sm text-gray-800">{leave.dates}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-600">{leave.duration}</td>
                                                        <td className="py-3 px-4 text-center">
                                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(leave.status)}`}>{leave.status}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Scholarship Information</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2"><span>College Scholarship (Base)</span><span className="font-medium text-gray-800">₹30,000</span></div>
                                    <div className="flex justify-between items-center text-sm text-red-600 mb-3"><span>LWP Deductions</span><span className="font-medium">- ₹2,000</span></div>
                                    <div className="border-t pt-3 flex justify-between items-center text-md font-bold text-green-700"><span>Final Payout</span><span>₹28,000</span></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Other Scholarships</h4>
                                    <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
                                        {otherScholarships.map((s, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm text-gray-600"><span>{s.name}</span><span className="font-medium text-gray-800">{s.amount}</span></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
