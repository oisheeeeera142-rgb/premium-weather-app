import { motion } from "framer-motion";

function SectionTitle({
  title,
  subtitle = "",
  action = null
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.35
      }}
      className="
        flex
        items-center
        justify-between
        mb-4
      "
    >
      <div>
        <h2
          className="
            text-white
            text-xl
            md:text-2xl
            font-bold
          "
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="
              text-white/60
              text-sm
              mt-1
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div>
          {action}
        </div>
      )}
    </motion.div>
  );
}

export default SectionTitle;