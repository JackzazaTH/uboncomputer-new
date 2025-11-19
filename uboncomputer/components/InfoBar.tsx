
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const IconComponent = iconComponents[item.icon];
            return (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  {IconComponent && <IconComponent size={32} className="text-orange-500" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
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