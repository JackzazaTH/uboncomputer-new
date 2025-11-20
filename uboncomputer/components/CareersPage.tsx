import React from 'react';
import { Page, CareersPageContent, CareersFeatureCard, JobOpening } from '../types';
import { Briefcase, MapPin, Clock, Users, TrendingUp, Coffee, ArrowRight, CircleDollarSign } from 'lucide-react';

interface CareersPageProps {
    content: CareersPageContent;
    onNavigate: (page: Page, data?: { jobId: number }) => void;
}

const iconMap: Record<CareersFeatureCard['icon'], React.ReactNode> = {
    Users: <Users size={24} />,
    TrendingUp: <TrendingUp size={24} />,
    Coffee: <Coffee size={24} />,
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const CareersPage: React.FC<CareersPageProps> = ({ content, onNavigate }) => {
    const activeJobs = content.openings.jobs.filter(job => job.isActive);

    const handleViewDetails = (job: JobOpening) => {
        onNavigate('jobDetail', { jobId: job.id });
    };

    return (
        <>
            <div className="bg-gray-50">
                {/* Hero Section */}
                <section className="relative bg-gray-800 text-white py-24 sm:py-32">
                    <img 
                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2400&auto=format&fit=crop" 
                        alt="Team collaboration" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                            {content.hero.title}
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                            {content.hero.subtitle}
                        </p>
                    </div>
                </section>

                {/* Why Work With Us Section */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{content.whyUs.title}</h2>
                             <p className="mt-4 max-w-2xl mx-auto text-gray-600">{content.whyUs.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {content.whyUs.features.map(feature => (
                                <FeatureCard 
                                    key={feature.id}
                                    icon={iconMap[feature.icon]} 
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Openings Section */}
                <section className="py-16 sm:py-24 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{content.openings.title}</h2>
                             <p className="mt-4 max-w-2xl mx-auto text-gray-600">{content.openings.subtitle}</p>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-6">
                            {activeJobs.map((job) => (
                                <div 
                                    key={job.id} 
                                    onClick={() => handleViewDetails(job)}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-orange-400 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                                        <span className={`mt-2 sm:mt-0 text-sm font-semibold px-3 py-1 rounded-full ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                            {job.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-gray-500 text-sm mt-2 mb-4">
                                        <div className="flex items-center">
                                            <MapPin size={16} className="mr-2"/>
                                            <span>{job.location}</span>
                                        </div>
                                        {job.salary && (
                                            <div className="flex items-center">
                                                <CircleDollarSign size={16} className="mr-2"/>
                                                <span>{job.salary}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                                    <div className="inline-flex items-center bg-orange-600 text-white font-bold py-2 px-5 rounded-md hover:bg-orange-700 transition-colors">
                                        ดูรายละเอียดและสมัคร
                                        <ArrowRight size={16} className="ml-2"/>
                                    </div>
                                </div>
                            ))}
                            {activeJobs.length === 0 && (
                                <div className="text-center py-10 bg-white rounded-lg border">
                                    <p className="text-gray-500">ขออภัย ขณะนี้ยังไม่มีตำแหน่งงานว่าง</p>
                                </div>
                            )}
                        </div>

                         <div className="mt-16 text-center border-t pt-12">
                            <h3 className="text-2xl font-bold text-gray-900">{content.cta.title}</h3>
                            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
                                {content.cta.subtitle}
                                <a href={`mailto:${content.cta.email}`} className="font-semibold text-orange-600 hover:underline"> {content.cta.email}</a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CareersPage;