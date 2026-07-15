import { motion } from "framer-motion";
import {
  WiCloud
} from "react-icons/wi";

function CloudyAnimation() {
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
          x: [-40, 40, -40]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
          absolute
          top-12
          left-10
          opacity-30
        "
      >
        <WiCloud
          size={140}
          className="
            text-white
          "
        />
      </motion.div>


      <motion.div
        animate={{
          x: [50, -30, 50]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
          absolute
          top-32
          right-0
          opacity-20
        "
      >
        <WiCloud
          size={180}
          className="
            text-white
          "
        />
      </motion.div>

    </div>
  );
}

export default CloudyAnimation;