
import React from 'react';
import { useComparison } from '../hooks/useComparison';
import { Page } from '../types';
import { X, GitCompare, Trash2 } from 'lucide-react';

interface ComparisonTrayProps {
    onNavigate: (page: Page) => void;
}

const ComparisonTray: React.FC<ComparisonTrayProps> = ({ onNavigate }) => {
    const { compareItems, removeFromCompare, clearCompare } = useComparison();

    if (compareItems.length === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] z-40 animate-slide-in-up lg:pb-0 pb-16 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center gap-4 flex-grow min-w-0">
                        <h3 className="text-lg font-bold hidden sm:block flex-shrink-0">เปรียบเทียบ ({compareItems.length}/4)</h3>
                        <div className="flex items-center gap-3 overflow-x-auto">
                            {compareItems.map(item => (
                                <div key={item.id} className="relative group flex-shrink-0">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain bg-white rounded-md p-1 border"/>
                                    <button 
                                        onClick={() => removeFromCompare(item.id)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label={`Remove ${item.name} from comparison`}
                                    >
                                        <X size={14}/>
                                    </button>
                                </div>
                            ))}
                            {[...Array(4 - compareItems.length)].map((_, i) => (
                                <div key={`placeholder-${i}`} className="hidden md:block w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex-shrink-0"></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <button 
                            onClick={clearCompare}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">ล้างทั้งหมด</span>
                        </button>
                         <button 
                            onClick={() => onNavigate('compare')}
                            className="flex items-center bg-orange-600 font-bold py-2.5 px-4 sm:px-6 rounded-md hover:bg-orange-700 text-white transition-colors"
                        >
                            <GitCompare size={20} className="mr-2"/>
                            เปรียบเทียบ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonTray;