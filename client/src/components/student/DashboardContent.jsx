import React, { useState, useContext } from 'react';
import { StudentContext } from '../../context/StudentContext';
import { FiHome, FiUser, FiBookOpen, FiAward, FiMenu } from 'react-icons/fi';

// Import the separated components
import DashboardHeader from '../layout/DashboardHeader';
import DashboardFooter from '../layout/DashboardFooter';

// Reusable Sidebar Component (can also be moved to its own file later if needed)
const Sidebar = ({ isSidebarOpen, onSidebarToggle }) => {
    const navItems = [
        { name: 'Home', icon: FiHome },
        { name: 'Profile', icon: FiUser },
        { name: 'Enjoyed Leave', icon: FiBookOpen },
        { name: 'Scholarship', icon: FiAward },
    ];
    const activeItem = 'Home';

    return (
        <aside className={`bg-white transition-all transition-width duration-500 ease-in-out h-full border-r border-gray-200 z-30 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'} overflow-x-hidden`} style={{ minWidth: isSidebarOpen ? '16rem' : '4rem' }}>
            <button
                className="group p-3 flex items-start justify-start hover:bg-cyan-100"
                onClick={onSidebarToggle}
                style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none'
                }}
            >
                <FiMenu
                    size={28}
                    className="text-gray-700 transition-colors duration-200 group-hover:text-cyan-700"
                />
            </button>
            <nav className="mt-4 flex-1">
                <ul>
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = item.name === activeItem;

                        return (
                            <li key={item.name} className="mb-2 px-2">
                                <a
                                    href="#"
                                    className={`group flex items-center gap-4 p-3 rounded-lg text-lg transition-colors duration-200
                                        ${isActive
                                            ? 'bg-cyan-100 hover:bg-cyan-50'
                                            : 'hover:bg-cyan-100'
                                        }`}
                                    style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center' }}
                                >
                                    <IconComponent
                                        size={24}
                                        className={`transition-colors duration-200
                                            ${isActive
                                                ? 'text-cyan-700'
                                                : 'text-gray-700 group-hover:text-cyan-700'
                                            }`}
                                    />
                                    {isSidebarOpen && (
                                        <span
                                            className={`whitespace-nowrap transition-colors duration-200 font-semibold
                                                ${isActive
                                                    ? 'text-cyan-900'
                                                    : 'text-gray-700 group-hover:text-cyan-700'
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

// Main Dashboard Content Component
export default function DashboardContent() {
    // Note: StudentContext is still needed here for the user's name, dept, etc.
    const { user } = useContext(StudentContext); 
    const [selectedLeaveType, setSelectedLeaveType] = useState('CL');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const leaveData = {
        CL: { balance: '12/30', history: [{ dates: '2025-11-15 to 2025-11-17', duration: '3 days', status: 'APPROVED BY DEAN' }, { dates: '2025-10-05 to 2025-10-06', duration: '2 days', status: 'PENDING' }] },
        DL: { balance: '3/10', history: [{ dates: '2025-11-10 to 2025-11-12', duration: '3 days', status: 'PENDING' }] },
        LWP: { balance: '2', history: [{ dates: '2025-11-05 to 2025-11-06', duration: '2 days', status: 'APPROVED BY OPERATOR' }] },
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
        <div className="w-screen h-screen bg-white flex flex-col">
            <DashboardHeader />
            <div className="flex flex-1 overflow-y-auto relative">
                <Sidebar isSidebarOpen={isSidebarOpen} onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-500 tracking-tight">Welcome, {user?.name || 'Student'} - {user?.collegeId || '...'}</h2>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-gray-100 text-gray-800 rounded-xl px-4 py-2 text-base font-semibold whitespace-nowrap">Dept: {user?.department || '...'}</span>
                            <span className="bg-gray-100 text-gray-800 rounded-xl px-4 py-2 text-base font-semibold whitespace-nowrap">Guide: {user?.guide || '...'}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-full min-h-[340px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Leave Status</h3>
                                <button className="text-xs font-semibold text-white bg-black hover:bg-gray-800 transition-colors px-3 py-1 rounded-lg shadow-sm">Apply Leave</button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                {Object.entries(leaveData).map(([key, value]) => {
                                    const isActive = selectedLeaveType === key;
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => setSelectedLeaveType(isActive ? null : key)}
                                            className={`group p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                                                ${isActive
                                                    ? 'border-cyan-400 bg-cyan-50'
                                                    : 'bg-white border-gray-200 hover:bg-cyan-50 hover:border-cyan-300'
                                                }`}
                                        >
                                            <p className="font-semibold text-sm text-gray-600 transition-colors duration-200 group-hover:text-cyan-900 group-hover:font-bold">
                                                {key === 'CL' ? 'Casual Leave' : key === 'DL' ? 'Duty Leave' : 'Leave Without Pay'} ({key})
                                            </p>
                                            <p className="text-2xl mt-1 font-bold text-gray-800 transition-colors duration-200 group-hover:text-cyan-700 group-hover:font-extrabold">
                                                {value.balance}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            {selectedLeaveType && (
                                <div className="animate-fade-in">
                                    <h4 className="font-bold text-md mb-2 text-gray-800">{selectedLeaveType} History</h4>
                                    <div className="overflow-x-auto rounded-lg border bg-white">
                                        <table className="min-w-full bg-transparent border-separate border-spacing-0">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b w-[45%]">Dates</th>
                                                    <th className="py-2 px-4 text-left text-xs font-semibold text-gray-500 uppercase border-b w-[25%]">Duration</th>
                                                    <th className="py-2 px-4 text-center text-xs font-semibold text-gray-500 uppercase border-b w-[30%]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(() => {
                                                    const history = leaveData[selectedLeaveType].history;
                                                    const rows = [...history, ...Array(3 - history.length).fill({ dates: '-', duration: '-', status: '-' })].slice(0, 3);
                                                    return rows.map((leave, i) => (
                                                        <tr key={i} className="border-t hover:bg-gray-50 transition">
                                                            <td className="py-3 px-4 text-sm text-gray-800 align-middle whitespace-nowrap">{leave.dates}</td>
                                                            <td className="py-3 px-4 text-sm text-gray-600 align-middle whitespace-nowrap">{leave.duration}</td>
                                                            <td className="py-3 px-4 text-center align-middle whitespace-nowrap">
                                                                <span className={`inline-block min-w-[90px] px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(leave.status)}`}>{leave.status}</span>
                                                            </td>
                                                        </tr>
                                                    ));
                                                })()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-full min-h-[340px]">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">This Month Earning</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                                    <div className="flex justify-between items-center text-base font-medium text-cyan-900 mb-2">
                                        <span>College Scholarship (Base)</span>
                                        <span className="font-semibold">₹30,000</span>
                                    </div>
                                    <div className="flex justify-between items-center text-base font-medium text-red-700 mb-3">
                                        <span>LWP Deductions</span>
                                        <span className="font-semibold">- ₹2,000</span>
                                    </div>
                                    <div className="border-t border-cyan-200 pt-3 flex justify-between items-center text-xl font-bold text-green-800">
                                        <span>Final Payout</span>
                                        <span>₹28,000</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Other Scholarships</h4>
                                    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 space-y-2">
                                        {otherScholarships.map((s, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm text-gray-800"><span>{s.name}</span><span className="font-medium text-gray-800">{s.amount}</span></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <DashboardFooter />
        </div>
    );
}