import React, { useState, useRef, useEffect } from 'react';
import { JobOpening } from '../types';
import { useToast } from '../hooks/useToast';
import { X, User, Mail, Phone, UploadCloud, Send, MapPin, CircleDollarSign } from 'lucide-react';

interface JobApplicationModalProps {
    isOpen: boolean;
    job: JobOpening | null;
    onClose: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, job, onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeFileName, setResumeFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const { addToast } = useToast();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset form when a new job is selected
            setFullName('');
            setEmail('');
            setPhone('');
            setCoverLetter('');
            setResumeFileName('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !phone) {
            addToast('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error');
            return;
        }
        // Simulate submission
        addToast('ส่งใบสมัครของคุณเรียบร้อยแล้ว!', 'success');
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFileName(e.target.files[0].name);
        } else {
            setResumeFileName('');
        }
    };
    
    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center p-4 animate-fade-in" onClick={onClose}>
            <div 
                ref={modalRef} 
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-slide-in-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><X size={20} /></button>
                </div>

                {/* Content */}
                <form id="job-application-form" onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {/* Job Details */}
                        <div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-600 text-sm mb-4">
                                <span className={`font-semibold px-3 py-1 rounded-full ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{job.type}</span>
                                <div className="flex items-center"><MapPin size={16} className="mr-1"/>{job.location}</div>
                                {job.salary && <div className="flex items-center"><CircleDollarSign size={16} className="mr-1"/>{job.salary}</div>}
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                        </div>

                        {/* Application Form */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">กรอกใบสมัคร</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล*</label>
                                        <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์*</label>
                                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล*</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
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
                                    <textarea id="coverLetter" rows={4} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex-shrink-0 p-4 border-t bg-gray-50 rounded-b-lg">
                     <div className="flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">ยกเลิก</button>
                        <button type="submit" form="job-application-form" className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                            <Send size={16} className="mr-2" />
                            ส่งใบสมัคร
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationModal;
