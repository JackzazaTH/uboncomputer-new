
import React from 'react';
import { MapPin } from 'lucide-react';
import { StoreInfoContent } from '../types';

interface StoreInfoProps {
  content: StoreInfoContent;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ content }) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 mt-6">
      {/* Large Banner */}
      <div className="2xl:col-span-2 rounded-xl overflow-hidden group shadow-lg">
        <img
          src={content.mainImage}
          alt="Uboncomputer Store Front"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Store Locations */}
      <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
        <div className="bg-orange-600 text-white p-4 flex items-center shrink-0">
          <MapPin size={24} className="mr-3" />
          <h3 className="font-bold text-lg">สาขา Ubon Computer</h3>
        </div>
        <div className="p-2 flex-grow overflow-y-auto h-72">
            <div className="space-y-2 p-2">
            {content.branches.map((branch) => (
                <div key={branch.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="font-semibold text-gray-800">{branch.name}</p>
                    <p className="text-sm text-gray-600">โทร.{branch.phone}</p>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;