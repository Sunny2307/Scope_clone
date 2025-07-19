import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Home, BookOpen, FileText, CheckCircle, UploadCloud } from 'lucide-react';

// Mock email from signup (in a real app, this would come from auth context or props)
const userEmail = "john.doe@charusat.edu.in";

// Main component for the student profile form
export default function StudentProfileForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    studentId: userEmail.split('@')[0], // Auto-fill from email
    studentName: '',
    institute: 'P. D. Patel Institute of Applied Science',
    admissionDate: '',
    registrationDate: '',
    admissionYear: '',
    currentSemester: '',
    gender: '',
    birthDate: '',
    admissionCastCategory: '',
    actualCastCategory: '',
    nationality: 'Indian',
    profilePhoto: null,
    localAddress: '',
    permanentAddress: '',
    country: 'India',
    mobileNo: '',
    guardianMobileNo: '',
    guardianEmail: '',
    personalEmail: '',
    institutionalEmail: '',
    isHandicapped: false,
    disability: '',
    belongsToSamaj: false,
    hostelNameAddress: '',
    nameOfGuide: '',
    ugcId: '',
    scholarshipAmount: '',
    contingencyAmount: '',
    scholarshipType: '',
    aadhaarNumber: '',
    pancardNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.studentId) newErrors.studentId = 'Student ID is required';
      if (!formData.studentName) newErrors.studentName = 'Student name is required';
      if (!formData.admissionDate) newErrors.admissionDate = 'Admission date is required';
      if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    } else if (currentStep === 2) {
      if (!formData.localAddress) newErrors.localAddress = 'Local address is required';
      if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent address is required';
      if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
      if (!/^\d{10}$/.test(formData.mobileNo)) newErrors.mobileNo = 'Mobile number must be 10 digits';
      if (!formData.personalEmail) newErrors.personalEmail = 'Personal email is required';
      if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) newErrors.personalEmail = 'Personal email is invalid';
      if (!formData.institutionalEmail) newErrors.institutionalEmail = 'Institutional email is required';
      if (!/\S+@\S+\.\S+/.test(formData.institutionalEmail)) newErrors.institutionalEmail = 'Institutional email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      console.log('Form Data Submitted:', formData);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetails formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <ContactInfo formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <AcademicInfo formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <Documents formData={formData} handleChange={handleChange} errors={errors} />;
      case 5:
        return <Review formData={formData} />;
      default:
        return <PersonalDetails formData={formData} handleChange={handleChange} errors={errors} />;
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-screen bg-gray-50 font-sans flex items-center justify-center min-h-screen p-4 overflow-x-hidden">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Created!</h1>
          <p className="text-gray-600">Your student profile has been successfully created.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen bg-gray-50 font-sans flex items-center justify-center min-h-screen p-4 overflow-x-hidden">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Your Student Profile</h1>
        <p className="text-gray-500 text-center mb-8">Follow the steps to complete your profile.</p>
        <StepProgressBar currentStep={currentStep} />
        <div className="mt-10">{renderStep()}</div>
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button onClick={prevStep} className="flex items-center px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-2" /> Back
            </button>
          )}
          {currentStep < 5 && (
            <button onClick={nextStep} className="flex items-center ml-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Next <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
          {currentStep === 5 && (
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center ml-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400">
              {isSubmitting ? 'Submitting...' : 'Submit Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const StepProgressBar = ({ currentStep }) => {
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

const PersonalDetails = ({ formData, handleChange, errors }) => {
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
        <InputField label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} error={errors.admissionDate} required />
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

const ContactInfo = ({ formData, handleChange, errors }) => (
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

const AcademicInfo = ({ formData, handleChange, errors }) => (
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
      <InputField label="Scholarship Amount" name="scholarshipAmount" type="number" value={formData.scholarshipAmount} onChange={handleChange} />
      <InputField label="Contingency Amount" name="contingencyAmount" type="number" value={formData.contingencyAmount} onChange={handleChange} />
      <SelectField label="Scholarship Type" name="scholarshipType" value={formData.scholarshipType} onChange={handleChange}>
        <option value="">Select Scholarship</option>
        {['CPSF', 'SODH', 'UGC/CSIR JRF', 'DST-INSPIRE', 'Other'].map(type => <option key={type} value={type}>{type}</option>)}
      </SelectField>
    </div>
  </div>
);

const Documents = ({ formData, handleChange, errors }) => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-2xl font-semibold text-gray-700">Identification Documents</h2>
    <p className="text-gray-500">Please provide your identification details.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
      <InputField label="Pancard Number" name="pancardNumber" value={formData.pancardNumber} onChange={handleChange} />
    </div>
  </div>
);

const Review = ({ formData }) => {
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

const InputField = ({ label, name, type = 'text', value, onChange, error, required, readOnly = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      disabled={readOnly}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${error ? 'border-red-500' : 'border-gray-300'} ${readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, error, required, disabled = false, children }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const TextareaField = ({ label, name, value, onChange, error, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const RadioInput = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <span className="w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all"></span>
    <span className="text-gray-700">{label}</span>
  </label>
);

const CheckboxInput = ({ name, checked, onChange, label }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <span className="w-5 h-5 border-2 border-gray-400 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-all">
      {checked && <CheckCircle className="w-3 h-3 text-white" />}
    </span>
    <span className="text-gray-700">{label}</span>
  </label>
);