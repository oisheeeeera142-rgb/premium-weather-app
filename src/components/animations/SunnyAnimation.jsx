import { motion } from "framer-motion";

function SunnyAnimation() {
  return (
    <motion.div
      className="
      absolute
      top-10
      right-10
      text-8xl
      z-0
      "
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 10, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity
      }}
    >
      ☀️
    </motion.div>
  );
}

export default SunnyAnimation;