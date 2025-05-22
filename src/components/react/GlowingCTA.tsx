import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function GlowingCTA() {
  return (
    <motion.button
      whileHover={{ scale: 1.1, boxShadow: '0px 0px 12px #39ff14' }}
      whileTap={{ scale: 0.95 }}
      onClick={() => toast.success('Welcome to the movement 🌿')}
      className="bg-neon-green text-black font-bold py-3 px-6 rounded-full shadow-lg transition"
    >
      Join Tokn420
    </motion.button>
  );
}
