import { motion } from "framer-motion";

function GlassCard({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.02,
            }
          : undefined
      }
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/20
        bg-white/10
        backdrop-blur-[24px]
        shadow-2xl
        ${className}
      `}
    >
      {/* Top Light */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/20
          via-white/5
          to-transparent
          pointer-events-none
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          -bottom-24
          left-1/2
          -translate-x-1/2
          w-[280px]
          h-[160px]
          rounded-full
          bg-white/10
          blur-3xl
          pointer-events-none
        "
      />

      {/* Border Glow */}
      <div
        className="
          absolute
          inset-0
          rounded-[32px]
          border
          border-white/5
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default GlassCard;