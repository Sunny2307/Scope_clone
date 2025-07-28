// src/components/student/EnjoyedLeaveContent.jsx

import React, { useState, useMemo } from 'react';

// --- Helper Icon Components (using inline SVG for simplicity) ---

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

// --- Main Content Component ---

export default function EnjoyedLeaveContent({ onBack }) {
    // State for filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');

    // Mock data based on the screenshot
    const summaryData = [
        { label: 'Total Applications', value: '5', icon: '📄' },
        { label: 'CL Used', value: '6/30', icon: '📅' },
        { label: 'DL Used', value: '1', icon: '🗓️' },
        { label: 'LWP Used', value: '1', icon: '📆' },
    ];

    const allLeaveApplications = [
        { id: 1, type: 'CL', duration: '1/15/2024 to 1/17/2024', days: 3, reason: 'Family emergency - grandmother passed away', status: 'Final Approved', appliedDate: '1/10/2024' },
        { id: 2, type: 'DL', duration: '2/20/2024 to 2/22/2024', days: 3, reason: 'IEEE Conference on AI and Machine Learning', status: 'Operator Approved', appliedDate: '2/10/2024' },
        { id: 3, type: 'CL', duration: '3/5/2024 to 3/7/2024', days: 3, reason: 'Wedding ceremony of close relative', status: 'Guide Approved', appliedDate: '3/1/2024' },
        { id: 4, type: 'LWP', duration: '7/25/2024 to 7/25/2024', days: 1, reason: 'Personal work - unable to attend', status: 'Pending Review', appliedDate: '7/20/2024' },
        { id: 5, type: 'CL', duration: '6/10/2024 to 6/12/2024', days: 3, reason: 'Medical checkup and treatment', status: 'Rejected', appliedDate: '6/5/2024' },
    ];

    // Memoized filtering logic
    const filteredApplications = useMemo(() => {
        return allLeaveApplications.filter(app => {
            const searchLower = searchTerm.toLowerCase();
            const statusMatch = statusFilter === 'All Status' || app.status === statusFilter;
            const typeMatch = typeFilter === 'All Types' || app.type === typeFilter.split(' ')[0]; // Match 'CL' from 'CL (Casual Leave)'
            const searchTermMatch = searchLower === '' || app.reason.toLowerCase().includes(searchLower) || app.type.toLowerCase().includes(searchLower);

            return statusMatch && typeMatch && searchTermMatch;
        });
    }, [searchTerm, statusFilter, typeFilter]);


    const getStatusChipClass = (status) => {
        switch (status) {
            case 'Final Approved': return 'bg-green-100 text-green-800';
            case 'Operator Approved': return 'bg-blue-100 text-blue-800';
            case 'Guide Approved': return 'bg-cyan-100 text-cyan-800';
            case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-full mx-auto">
                {/* --- Header --- */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <BackArrowIcon />
                    </button>
                    <div>
                        {/* 1. Heading font size changed to text-2xl */}
                        <h1 className="text-2xl font-semibold text-gray-800">My Leave Applications</h1>
                        <p className="text-gray-500">Track your leave requests and their status</p>
                    </div>
                </div>

                {/* --- Summary Cards --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {summaryData.map((item, index) => (
                        <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{item.label}</p>
                                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                            </div>
                            <div className="text-3xl">{item.icon}</div>
                        </div>
                    ))}
                </div>

                {/* --- Filter and Search --- */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <FilterIcon />
                        <h3 className="text-lg font-semibold text-gray-700">Filter & Search</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by reason or type..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon />
                            </div>
                        </div>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Status</option>
                            <option>Final Approved</option>
                            <option>Operator Approved</option>
                            <option>Guide Approved</option>
                            <option>Pending Review</option>
                            <option>Rejected</option>
                        </select>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>CL</option>
                            <option>DL</option>
                            <option>LWP</option>
                        </select>
                    </div>
                </div>

                {/* --- Leave Applications Table --- */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                     <h3 className="text-xl font-bold text-gray-800 p-6">Leave Applications ({filteredApplications.length})</h3>
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Duration</th>
                                <th scope="col" className="px-6 py-3">Days</th>
                                <th scope="col" className="px-6 py-3">Reason</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Applied Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map((app) => (
                                <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold">{app.type}</td>
                                    <td className="px-6 py-4">{app.duration}</td>
                                    <td className="px-6 py-4">{app.days}</td>
                                    <td className="px-6 py-4">{app.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{app.appliedDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
