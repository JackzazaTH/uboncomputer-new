import React, { useMemo, useState } from 'react';
import { Product, Page, Review } from '../types';
import StarRating from './StarRating';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewsPageProps {
    products: Product[];
    onNavigate: (page: Page, data?: { productId: number }) => void;
}

// Augment the Review type for this page's specific needs
interface AggregatedReview extends Review {
    productName: string;
    productImage: string;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ products, onNavigate }) => {
    const [sortOrder, setSortOrder] = useState<'latest' | 'highest' | 'lowest'>('latest');
    const [filterRating, setFilterRating] = useState<number>(0); // 0 means all ratings

    const allReviews = useMemo((): AggregatedReview[] => {
        return products.flatMap(product => 
            product.reviews.map(review => ({
                ...review,
                productName: product.name,
                productImage: product.imageUrls[0],
            }))
        );
    }, [products]);

    const sortedAndFilteredReviews = useMemo(() => {
        let reviews = [...allReviews];

        if (filterRating > 0) {
            reviews = reviews.filter(r => Math.round(r.rating) === filterRating);
        }

        switch (sortOrder) {
            case 'highest':
                reviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                reviews.sort((a, b) => a.rating - b.rating);
                break;
            case 'latest':
            default:
                reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
        }
        return reviews;
    }, [allReviews, sortOrder, filterRating]);

    const summary = useMemo(() => {
        if (allReviews.length === 0) {
            return { total: 0, average: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
        }
        const total = allReviews.length;
        const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
        const average = sum / total;
        const distribution = allReviews.reduce((acc, r) => {
            const rating = Math.floor(r.rating);
            if (rating >= 1 && rating <= 5) {
                acc[rating as keyof typeof acc]++;
            }
            return acc;
        }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

        return { total, average, distribution };
    }, [allReviews]);

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <MessageSquare size={48} className="mx-auto text-orange-500 mb-2" />
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">รีวิวจากลูกค้าทั้งหมด</h1>
                    <p className="mt-2 text-lg text-gray-500">ความคิดเห็นจริงจากผู้ใช้งานผลิตภัณฑ์ของเรา</p>
                </div>

                {/* Summary Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="text-center border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-6">
                            <p className="text-5xl font-bold text-gray-800">{summary.average.toFixed(1)}</p>
                            <StarRating rating={summary.average} readOnly size={24} />
                            <p className="text-gray-500 mt-1">จาก {summary.total} รีวิว</p>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <div className="space-y-1">
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div key={star} className="flex items-center gap-2 text-sm">
                                        <div className="flex items-center">
                                            <span>{star}</span>
                                            <Star size={16} className="text-yellow-400 fill-yellow-400 ml-1" />
                                        </div>
                                        <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-yellow-400 h-2.5 rounded-full" 
                                                style={{ width: `${summary.total > 0 ? (summary.distribution[star as keyof typeof summary.distribution] / summary.total) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-12 text-right text-gray-600 font-medium">
                                            {summary.distribution[star as keyof typeof summary.distribution]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-700 font-semibold mb-2 sm:mb-0">
                        แสดง {sortedAndFilteredReviews.length} รีวิว
                    </p>
                    <div className="flex items-center space-x-4">
                         <div className="flex items-center space-x-2">
                            <label htmlFor="filter" className="text-sm font-medium">กรองตามคะแนน:</label>
                             <select id="filter" value={filterRating} onChange={e => setFilterRating(Number(e.target.value))} className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white text-gray-800">
                                <option value="0">ทั้งหมด</option>
                                <option value="5">5 ดาว</option>
                                <option value="4">4 ดาว</option>
                                <option value="3">3 ดาว</option>
                                <option value="2">2 ดาว</option>
                                <option value="1">1 ดาว</option>
                            </select>
                         </div>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="sort" className="text-sm font-medium">เรียงตาม:</label>
                            <select id="sort" value={sortOrder} onChange={e => setSortOrder(e.target.value as any)} className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white text-gray-800">
                                <option value="latest">ล่าสุด</option>
                                <option value="highest">คะแนนสูงสุด</option>
                                <option value="lowest">คะแนนต่ำสุด</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {sortedAndFilteredReviews.length > 0 ? (
                        sortedAndFilteredReviews.map(review => (
                            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div 
                                        onClick={() => onNavigate('productDetail', { productId: review.productId })}
                                        className="flex-shrink-0 text-center cursor-pointer group"
                                    >
                                        <img src={review.productImage} alt={review.productName} className="w-24 h-24 object-contain rounded-md border p-1 mx-auto" />
                                        <p className="text-xs text-gray-600 mt-2 line-clamp-2 w-24 group-hover:text-orange-600 transition-colors">{review.productName}</p>
                                    </div>
                                    <div className="flex-grow border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-4">
                                        <div className="flex items-center mb-2">
                                            <StarRating rating={review.rating} readOnly size={16} />
                                            <p className="ml-3 font-bold text-gray-800">{review.author}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {new Date(review.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800">ไม่พบรีวิวที่ตรงกับเงื่อนไข</h3>
                            <p className="mt-1 text-gray-500">ลองปรับเปลี่ยนตัวกรองของคุณ</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewsPage;