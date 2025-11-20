
import React from 'react';
import { Truck, RefreshCw, Clock, ShieldCheck } from 'lucide-react';
import { InfoBarItem, IconName } from '../types';

const iconComponents: Record<IconName, React.FC<any>> = {
  Truck,
  RefreshCw,
  Clock,
  ShieldCheck,
};

interface InfoBarProps {
  items: InfoBarItem[];
}

const InfoBar: React.FC<InfoBarProps> = ({ items }) => {
  return (
    <section className="py-4 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const IconComponent = iconComponents[item.icon];
            return (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3 border border-gray-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  {IconComponent && <IconComponent size={24} className="text-orange-500" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                  <p className="text-[10px] text-gray-500">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfoBar;
