import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 px-4">
      {/* Cloud Icon Animation */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-300 shadow-md rounded-2xl p-10 flex flex-col items-center max-w-lg w-full"
      >
        {/* Big Cloud / Upload-like Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
          className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gray-100 shadow-inner"
        >
            <img src='/svg/upload.svg' alt='Upload' className={`mb-2 h-16`} />
        </motion.div>

        {/* Error Text */}
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700 transition"
          >
            Go Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500">
        by <span className="font-medium">ganeshbelote18@gmail.com</span>
      </p>
    </div>
  );
}
