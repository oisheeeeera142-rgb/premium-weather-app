import { motion } from "framer-motion";
import {
  WiMoonAltWaningCrescent4
} from "react-icons/wi";


const stars =
  Array.from(
    {
      length: 25
    },
    (_, index) =>
      index
  );


function NightAnimation() {
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
          rotate: [
            -5,
            5,
            -5
          ]
        }}
        transition={{
          duration: 5,
          repeat:
            Infinity
        }}
        className="
          absolute
          top-10
          right-10
        "
      >

        <WiMoonAltWaningCrescent4
          size={100}
          className="
            text-yellow-200
          "
        />

      </motion.div>


      {
        stars.map(
          (star) => (
            <motion.span

              key={star}

              animate={{
                opacity:[
                  0.2,
                  1,
                  0.2
                ]
              }}

              transition={{
                duration:
                  2 +
                  Math.random() * 3,

                repeat:
                  Infinity,

                delay:
                  Math.random() * 2
              }}

              className="
                absolute
                w-1
                h-1
                rounded-full
                bg-white
              "

              style={{
                top:
                  `${Math.random()*100}%`,

                left:
                  `${Math.random()*100}%`
              }}

            />
          )
        )
      }

    </div>
  );
}

export default NightAnimation;