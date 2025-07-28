import React, { useState } from 'react';

// Import layout components (assuming they exist in your project structure)
import DashboardHeader from '../layout/DashboardHeader';
import DashboardFooter from '../layout/DashboardFooter';
import Sidebar from '../layout/Sidebar'; // Adjusted import to match the new file structure


// --- Helper Icon Components (using inline SVG for simplicity) ---
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const FileUploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

const RupeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m12 8 4 8" />
        <path d="M8 16h12" />
    </svg>
);


// Main Content for the Apply Leave page
export default function ApplyLeaveContent({ onBackToDashboard }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const leaveTypes = [
        { key: 'CL', name: 'Casual Leave' },
        { key: 'DL', name: 'Duty Leave' },
        { key: 'LWP', name: 'Leave Without Pay' }
    ];

    const leaveInfoData = {
        CL: { title: 'Casual Leave (CL)', description: 'Up to 30 days per year' },
        DL: { title: 'Duty Leave (DL)', description: 'For conferences/events', requiresDocs: true },
        LWP: { title: 'Leave Without Pay (LWP)', description: 'After CL exhausted', deduction: '₹1000 per day deduction' }
    };

    const leaveBalances = {
        'CL Used': '15/30',
        'DL Used': '3',
        'LWP Used': '2'
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setSubmissionStatus(null);
        console.log('Submitting Leave Request:', { leaveType, startDate, endDate, reason, files });
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmissionStatus('success');
        setIsSubmitting(false);
        setTimeout(() => {
            setSubmissionStatus(null);
            setLeaveType('');
            setStartDate('');
            setEndDate('');
            setReason('');
            setFiles([]);
        }, 3000);
    };

    // Style for inputs to show placeholder text correctly and change color on selection
    const getInputStyle = (hasValue) => {
        return `w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
            hasValue ? 'text-gray-900' : 'text-gray-400'
        }`;
    };

    const selectedLeaveInfo = leaveInfoData[leaveType];

    return (
        <div className="w-screen h-screen bg-white flex flex-col">
            <DashboardHeader />
            <div className="flex flex-1 overflow-y-hidden relative">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <button onClick={onBackToDashboard} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <BackArrowIcon />
                            </button>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Apply for Leave</h2>
                                <p className="text-gray-500">Submit your leave application</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <CalendarIcon />
                                    <h3 className="text-xl font-bold text-gray-800">Leave Application Form</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="leave-type" className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                        <select id="leave-type" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required className={getInputStyle(leaveType)}>
                                            <option value="" disabled>Select leave type</option>
                                            {leaveTypes.map(lt => (
                                                <option key={lt.key} value={lt.key} className="text-black">{lt.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                            <div className="relative">
                                                <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className={`${getInputStyle(startDate)} pr-10`} />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><CalendarIcon /></div>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                            <div className="relative">
                                                <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className={`${getInputStyle(endDate)} pr-10`} />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><CalendarIcon /></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
                                        <textarea id="reason" rows="4" value={reason} onChange={(e) => setReason(e.target.value)} required placeholder="Please provide a detailed reason..." className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"></textarea>
                                    </div>

                                    {/* --- Conditional Supporting Documents Section --- */}
                                    {leaveType === 'DL' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                                            <label htmlFor="file-upload" className="mt-1 flex flex-col justify-center items-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400">
                                                {/* ICON CENTERING FIX: Replaced 'text-center' with explicit flex centering */}
                                                <div className="flex flex-col items-center space-y-1">
                                                    <FileUploadIcon />
                                                    <div className="flex text-sm text-gray-600">
                                                        <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                            Click to upload conference/event documents
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG (MAX 10MB each)</p>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                                                </div>
                                            </label>
                                            {files.length > 0 && (
                                                <div className="mt-2 text-sm text-gray-500">
                                                    {files.map(file => <p key={file.name}>{file.name}</p>)}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* --- Conditional Button Layout --- */}
                                    {leaveType === 'DL' ? (
                                        <div className="flex items-center justify-end gap-4 pt-2">
                                            <button type="button" onClick={onBackToDashboard} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
                                            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between gap-4 pt-2">
                                            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
                                            <button type="button" onClick={onBackToDashboard} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none">Cancel</button>
                                        </div>
                                    )}

                                    {submissionStatus && <div className={`text-sm font-semibold text-right mt-2 ${submissionStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>{submissionStatus === 'success' ? 'Request submitted successfully!' : 'Something went wrong.'}</div>}
                                </form>
                            </div>

                            {/* --- Right Column --- */}
                            <div className="space-y-8">
                                {/* --- Conditional Leave Information Card --- */}
                                {selectedLeaveInfo && (
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Leave Information</h3>
                                        <div className="space-y-3">
                                            <p className="font-semibold text-gray-800">{selectedLeaveInfo.title}</p>
                                            <p className="text-sm text-gray-600">{selectedLeaveInfo.description}</p>
                                            {selectedLeaveInfo.requiresDocs && (
                                                <div className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                                                    <InfoIcon />
                                                    <span>Documents required</span>
                                                </div>
                                            )}
                                            {selectedLeaveInfo.deduction && (
                                                <div className="flex items-center gap-2 text-sm text-red-500 font-medium">
                                                    <RupeeIcon />
                                                    <span>{selectedLeaveInfo.deduction}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* --- Leave Balance Card --- */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Leave Balance</h3>
                                    <div className="space-y-3">
                                        {Object.entries(leaveBalances).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">{key}</span>
                                                <span className="font-semibold text-gray-800">{value}</span>
                                            </div>
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
