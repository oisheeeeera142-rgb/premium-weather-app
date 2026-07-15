import { motion } from "framer-motion";

function LoadingSpinner({
  size = 64,
  text = "Loading..."
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        py-12
      "
    >
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear"
        }}
        style={{
          width: size,
          height: size
        }}
        className="
          rounded-full
          border-4
          border-white/15
          border-t-white
        "
      />

      <p
        className="
          text-white/70
          text-sm
          font-medium
        "
      >
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;