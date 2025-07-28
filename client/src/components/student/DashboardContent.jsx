import React, { useState, useContext } from 'react';
import { StudentContext } from '../../context/StudentContext';
import DashboardHeader from '../layout/DashboardHeader';
import DashboardFooter from '../layout/DashboardFooter';
import Sidebar from '../layout/Sidebar'; // Adjusted import to match the new file structure


export default function DashboardContent({ onApplyLeaveClick }) {
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

    const leaveCardHoverStyles = {
        CL: 'hover:bg-cyan-50 hover:border-cyan-300',
        DL: 'hover:bg-green-50 hover:border-green-300',
        LWP: 'hover:bg-red-50 hover:border-red-300',
    };

    const getStatusClass = (status) => {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('approved')) return 'bg-green-100 text-green-800';
        if (lowerStatus.includes('pending')) return 'bg-yellow-100 text-yellow-800';
        if (lowerStatus.includes('rejected')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    const getLeaveCardClass = (key) => {
        switch (key) {
            case 'CL': return 'border-cyan-400 bg-cyan-50';
            case 'DL': return 'border-green-400 bg-green-50';
            case 'LWP': return 'border-red-400 bg-red-50';
            default: return 'border-gray-200 bg-white';
        }
    };

    return (
        <div className="w-screen h-screen bg-white flex flex-col">
            <DashboardHeader />
            <div className="flex flex-1 overflow-y-auto relative">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-500 tracking-tight">Welcome, {user?.name || 'Student'} - {user?.collegeId || '...'}</h2>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-2 text-base font-semibold whitespace-nowrap">Dept: {user?.department || '...'}</span>
                            <span className="bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-2 text-base font-semibold whitespace-nowrap">Guide: {user?.guide || '...'}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-full min-h-[340px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Leave Status</h3>
                                <button
                                    onClick={onApplyLeaveClick}
                                    className="px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors border
                                                 bg-gray-100 text-gray-900 border-gray-400
                                                 hover:bg-gray-200 hover:border-gray-500
                                                 active:bg-gray-300 active:border-gray-600
                                                 focus:outline-none"
                                >
                                    Apply Leave
                                </button>
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
                                                     ? getLeaveCardClass(key) 
                                                     : `bg-white border-gray-200 ${leaveCardHoverStyles[key]}`
                                                 }`}
                                         >
                                             <p className="font-semibold text-sm text-gray-600">
                                                 {key === 'CL' ? 'Casual Leave' : key === 'DL' ? 'Duty Leave' : 'Leave Without Pay'} ({key})
                                             </p>
                                             <p className="text-2xl mt-1 font-bold text-gray-800">
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
                                                     // Use an empty object as a placeholder
                                                     const placeholder = {}; 
                                                     const rows = [...history, ...Array(Math.max(0, 3 - history.length)).fill(placeholder)].slice(0, 3);
                                                     return rows.map((leave, i) => (
                                                         <tr key={i} className="border-t hover:bg-gray-50 transition">
                                                             {/* Use a non-breaking space to maintain cell height if content is empty */}
                                                             <td className="py-3 px-4 text-sm text-gray-800 align-middle whitespace-nowrap">{leave.dates || '\u00A0'}</td>
                                                             <td className="py-3 px-4 text-sm text-gray-600 align-middle whitespace-nowrap">{leave.duration || '\u00A0'}</td>
                                                             <td className="py-3 px-4 text-center align-middle whitespace-nowrap">
                                                                 {/* Conditionally render the status badge or a non-breaking space */}
                                                                 {leave.status ? (
                                                                     <span className={`inline-block min-w-[90px] px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(leave.status)}`}>{leave.status}</span>
                                                                 ) : '\u00A0'}
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
