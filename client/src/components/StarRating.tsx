import { motion } from "framer-motion";
import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
}

const messages: Record<number, string> = {
  1: "Poor 😔",
  2: "Fair 😐",
  3: "Good 👍",
  4: "Very Good 😊",
  5: "Excellent 🌟",
};

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (value: number) => setHoverRating(value);
  const handleMouseLeave = () => setHoverRating(0);
  const handleClick = (value: number) => {
    setRating(value);
    if (onRatingChange) onRatingChange(value);
  };

  return (
    <div className="flex flex-wrap items-center space-x-2 relative">
      {Array.from({ length: totalStars }, (_, i) => {
        const value = i + 1;
        const isFilled = value <= (hoverRating || rating);

        return (
          <motion.div
            key={value}
            className="relative flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-9 h-9 transition-colors duration-200 ${
                isFilled ? "fill-gray-300 stroke-gray-300" : "fill-transparent stroke-gray-300"
              }`}
              strokeWidth={2}
            >
              <path d="M12 2l3.09 6.26L21 9.27l-5 4.87 1.18 6.88L12 17.77l-5.18 2.85 1.18-6.88-5-4.87 5.91-1.01L12 2z" />
            </svg>

            {hoverRating === value && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.25, ease: [0.68, -0.55, 0.265, 1.55] }}
                className="absolute -top-6 bg-zinc-900 text-white text-xs font-medium px-3 py-1 rounded-lg border border-gray-400 whitespace-nowrap shadow-md"
              >
                {messages[value]}
                <div className="absolute left-1/2 -bottom-1.5 w-2 h-2 bg-zinc-900 border-r border-b border-gray-400 rotate-45 -translate-x-1/2" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default StarRating;
