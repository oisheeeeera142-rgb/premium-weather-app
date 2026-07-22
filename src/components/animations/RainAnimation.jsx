import { motion } from "framer-motion";

const drops = Array.from(
  {
    length: 35
  },
  (_, index) => index
);


function RainAnimation() {
  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      "
    >

      {drops.map((drop) => (
        <motion.span
          key={drop}
          initial={{
            y: -50,
            opacity: 0
          }}

          animate={{
            y: "110vh",
            opacity: [
              0,
              1,
              0
            ]
          }}

          transition={{
            duration:
              0.8 +
              Math.random(),

            repeat:
              Infinity,

            delay:
              Math.random() * 2,

            ease:
              "linear"
          }}

          className="
            absolute
            top-0
            w-[2px]
            h-12
            bg-blue-200/60
          "

          style={{
            left:
              `${Math.random() * 100}%`
          }}
        />
      ))}

    </div>
  );
}

export default RainAnimation;