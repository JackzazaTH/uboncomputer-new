import React, { useState, useRef } from 'react';
import { JobOpening, Page, JobApplication } from '../types';
import { useToast } from '../hooks/useToast';
import { User, Mail, Phone, UploadCloud, Send, MapPin, CircleDollarSign, ArrowLeft } from 'lucide-react';

interface JobDetailPageProps {
    job: JobOpening;
    onNavigate: (page: Page) => void;
    onSaveApplication: (applicationData: Omit<JobApplication, 'id' | 'submissionDate'>) => void;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onNavigate, onSaveApplication }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeFileName, setResumeFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !phone) {
            addToast('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error');
            return;
        }
        
        onSaveApplication({
            jobId: job.id,
            jobTitle: job.title,
            fullName,
            email,
            phone,
            coverLetter,
            resumeFileName,
        });

        addToast('ส่งใบสมัครของคุณเรียบร้อยแล้ว!', 'success');
        onNavigate('careers');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFileName(e.target.files[0].name);
        } else {
            setResumeFileName('');
        }
    };

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <button
                    onClick={() => onNavigate('careers')}
                    className="flex items-center text-orange-600 hover:text-orange-500 font-semibold mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    กลับไปที่หน้าสมัครงาน
                </button>

                {/* Job Details Section */}
                <div className="mb-10 p-6 bg-gray-50 rounded-lg border">
                    <h1 className="text-3xl font-extrabold text-gray-900">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 text-sm mt-3 mb-4">
                        <span className={`font-semibold px-3 py-1 rounded-full ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{job.type}</span>
                        <div className="flex items-center"><MapPin size={16} className="mr-1"/>{job.location}</div>
                        {job.salary && <div className="flex items-center"><CircleDollarSign size={16} className="mr-1"/>{job.salary}</div>}
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>

                {/* Application Form Section */}
                <div className="bg-white p-8 rounded-lg shadow-md border">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">กรอกใบสมัคร</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล*</label>
                                <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์*</label>
                                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล*</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">เรซูเม่ / CV</label>
                            <div 
                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-orange-400"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="space-y-1 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <p className="pl-1 truncate max-w-xs">
                                            {resumeFileName ? resumeFileName : 'อัปโหลดไฟล์ (PDF, DOC, DOCX)'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                        </div>

                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">จดหมายแนะนำตัว (ถ้ามี)</label>
                            <textarea id="coverLetter" rows={5} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"></textarea>
                        </div>
                        
                        <div className="pt-4">
                            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors">
                                <Send size={18} />
                                ส่งใบสมัคร
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;