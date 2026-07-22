import { motion } from "framer-motion";

function CloudAnimation() {
  return (
    <motion.div
      className="
      absolute
      top-20
      left-0
      text-7xl
      z-0
      "
      animate={{
        x: [-100, 300, -100]
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      ☁️
    </motion.div>
  );
}

export default CloudAnimation;