import React, { useContext, useState } from 'react';
import { StudentFormContext } from '../../../context/StudentFormContext';
import { User, Home, BookOpen, FileText, CheckCircle, UploadCloud } from 'lucide-react';
import { InputField, SelectField, TextareaField, RadioInput, CheckboxInput } from './FormControls';

export const StepProgressBar = () => {
    const { currentStep } = useContext(StudentFormContext);
    const steps = [
        { number: 1, title: 'Personal', icon: <User className="w-6 h-6" /> },
        { number: 2, title: 'Contact', icon: <Home className="w-6 h-6" /> },
        { number: 3, title: 'Academic', icon: <BookOpen className="w-6 h-6" /> },
        { number: 4, title: 'Documents', icon: <FileText className="w-6 h-6" /> },
        { number: 5, title: 'Review', icon: <CheckCircle className="w-6 h-6" /> },
    ];

    return (
        <div className="flex items-center justify-center">
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {step.icon}
                        </div>
                        <p className={`mt-2 text-sm font-semibold ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>{step.title}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export const PersonalDetails = () => {
    const { formData, handleChange, errors } = useContext(StudentFormContext);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
        handleChange(e);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                        ) : (
                            <UploadCloud className="w-8 h-8 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <label htmlFor="profilePhoto" className="cursor-pointer bg-blue-50 text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                            Upload Photo
                        </label>
                        <input id="profilePhoto" type="file" name="profilePhoto" onChange={handleFileChange} accept="image/*" className="hidden" />
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                <InputField label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} error={errors.studentId} required readOnly />
                <InputField label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} error={errors.studentName} required />
                <InputField label="Institute" name="institute" value={formData.institute} onChange={handleChange} readOnly />
                {/* Changed: Admission Date is now disabled (readOnly) */}
                <InputField label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} error={errors.admissionDate} readOnly />
                <InputField label="Registration Date" name="registrationDate" type="date" value={formData.registrationDate} onChange={handleChange} readOnly />
                <SelectField label="Admission Year" name="admissionYear" value={formData.admissionYear} onChange={handleChange} disabled>
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </SelectField>
                <SelectField label="Current Semester" name="currentSemester" value={formData.currentSemester} onChange={handleChange} disabled>
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
                </SelectField>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <div className="flex gap-4">
                        {['Male', 'Female', 'Other'].map(gender => (
                            <RadioInput key={gender} name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} label={gender} />
                        ))}
                    </div>
                </div>
                <InputField label="Birth Date" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} error={errors.birthDate} required />
                <SelectField label="Admission Cast Category" name="admissionCastCategory" value={formData.admissionCastCategory} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {['General', 'SC', 'ST', 'OBC', 'EWS'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </SelectField>
                <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
            </div>
        </div>
    );
};

export const ContactInfo = ({ /* ... */ }) => {
    const { formData, handleChange, errors } = useContext(StudentFormContext);
    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <TextareaField label="Local Address" name="localAddress" value={formData.localAddress} onChange={handleChange} error={errors.localAddress} required />
                </div>
                <div className="md:col-span-2">
                    <TextareaField label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} error={errors.permanentAddress} required />
                </div>
                <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
                <InputField label="Mobile No" name="mobileNo" type="tel" value={formData.mobileNo} onChange={handleChange} error={errors.mobileNo} required />
                <InputField label="Guardian Mobile No" name="guardianMobileNo" type="tel" value={formData.guardianMobileNo} onChange={handleChange} />
                <InputField label="Guardian Email" name="guardianEmail" type="email" value={formData.guardianEmail} onChange={handleChange} />
                <InputField label="Personal Email" name="personalEmail" type="email" value={formData.personalEmail} onChange={handleChange} error={errors.personalEmail} required />
                <InputField label="Institutional Email" name="institutionalEmail" type="email" value={formData.institutionalEmail} onChange={handleChange} error={errors.institutionalEmail} required />
            </div>
        </div>
    );
};


export const AcademicInfo = () => {
    const { formData, handleChange, errors } = useContext(StudentFormContext);
    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700">Academic & Other Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex items-center gap-8">
                    <CheckboxInput name="isHandicapped" checked={formData.isHandicapped} onChange={handleChange} label="Are you differently-abled?" />
                    <CheckboxInput name="belongsToSamaj" checked={formData.belongsToSamaj} onChange={handleChange} label="Do you belong to Samaj?" />
                </div>
                {formData.isHandicapped && (
                    <InputField label="Disability Details" name="disability" value={formData.disability} onChange={handleChange} />
                )}
                <div className="md:col-span-2">
                    <TextareaField label="Hostel Name and Address" name="hostelNameAddress" value={formData.hostelNameAddress} onChange={handleChange} />
                </div>
                <SelectField label="Name of Guide" name="nameOfGuide" value={formData.nameOfGuide} onChange={handleChange}>
                    <option value="">Select Guide</option>
                    {['Dr. John Smith', 'Prof. Jane Doe', 'Dr. Michael Brown', 'Prof. Sarah Johnson'].map(guide => (
                        <option key={guide} value={guide}>{guide}</option>
                    ))}
                </SelectField>
                <InputField label="UGC ID" name="ugcId" value={formData.ugcId} onChange={handleChange} readOnly />
                {/* Changed: Scholarship and Contingency amounts are now disabled (readOnly) */}
                <InputField label="Scholarship Amount" name="scholarshipAmount" type="number" value={formData.scholarshipAmount} onChange={handleChange} readOnly />
                <InputField label="Contingency Amount" name="contingencyAmount" type="number" value={formData.contingencyAmount} onChange={handleChange} readOnly />
                {/* Changed: Scholarship Type is now disabled */}
                <SelectField label="Scholarship Type" name="scholarshipType" value={formData.scholarshipType} onChange={handleChange} disabled>
                    <option value="">Select Scholarship</option>
                    {['CPSF', 'SODH', 'UGC/CSIR JRF', 'DST-INSPIRE', 'Other'].map(type => <option key={type} value={type}>{type}</option>)}
                </SelectField>
            </div>
        </div>
    );
};

export const Documents = () => {
    const { formData, handleChange, errors } = useContext(StudentFormContext);
    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700">Identification Documents</h2>
            <p className="text-gray-500">Please provide your identification details.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* Changed: Aadhaar and Pancard are now required */}
                <InputField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} required />
                <InputField label="Pancard Number" name="pancardNumber" value={formData.pancardNumber} onChange={handleChange} error={errors.pancardNumber} required />
            </div>
        </div>
    );
};

export const Review = ({ /* ... */ }) => {
    const { formData } = useContext(StudentFormContext);
    const renderValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        if (value instanceof File) {
            return value.name;
        }
        return value || 'N/A';
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Review Your Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key}>
                            <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="font-semibold text-gray-800">{renderValue(value)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
