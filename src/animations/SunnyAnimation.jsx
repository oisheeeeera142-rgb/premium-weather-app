import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";

function SunnyAnimation() {
  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      "
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
          absolute
          top-10
          right-10
          w-48
          h-48
          rounded-full
          bg-yellow-300/30
          blur-3xl
        "
      />

      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="
          absolute
          top-16
          right-16
        "
      >
        <WiDaySunny
          size={110}
          className="
            text-yellow-300
            drop-shadow-2xl
          "
        />
      </motion.div>
    </div>
  );
}

export default SunnyAnimation;