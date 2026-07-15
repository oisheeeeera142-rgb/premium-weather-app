import { motion } from "framer-motion";

function GlassCard({
  children,
  className = "",
  hover = true
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01
            }
          : undefined
      }
      transition={{
        duration: 0.25
      }}
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/15
        bg-white/10
        backdrop-blur-2xl
        shadow-weather
        ${className}
      `}
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/10
          to-transparent
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default GlassCard;