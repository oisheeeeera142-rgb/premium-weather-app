import { motion } from "framer-motion";

function ToggleSwitch({
  checked,
  onChange
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`
        relative
        w-14
        h-8
        rounded-full
        transition-colors
        ${checked ? "bg-blue-500" : "bg-white/20"}
      `}
    >
      <motion.div
        animate={{
          x: checked ? 24 : 4
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        className="
          absolute
          top-1
          w-6
          h-6
          rounded-full
          bg-white
          shadow-lg
        "
      />
    </button>
  );
}

export default ToggleSwitch;