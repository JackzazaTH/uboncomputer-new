import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, size = 20, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rate: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    if (!readOnly) {
      setHoverRating(rate);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className={`transition-colors ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          aria-label={`Rate ${star} stars`}
          disabled={readOnly}
        >
          <Star
            size={size}
            className={
              (hoverRating || rating) >= star
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
