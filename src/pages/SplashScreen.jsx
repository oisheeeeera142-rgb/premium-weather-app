

import {
  useEffect
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  motion
} from "framer-motion";


import {
  WiDaySunny
} from "react-icons/wi";


import AppBackground
from "../components/layout/AppBackground";


import {
  APP_NAME,
  SPLASH_DURATION
}
from "../utils/constants";



function SplashScreen() {


  const navigate =
    useNavigate();



  useEffect(() => {


    const timer =
      setTimeout(() => {


        navigate("/home");


      }, SPLASH_DURATION);



    return () =>
      clearTimeout(timer);


  },[
    navigate
  ]);



  return (


    <AppBackground
      condition="Clear"
      isNight={false}
    >


      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          text-white
          px-6
        "
      >


        <motion.div

          initial={{
            scale:0,
            opacity:0
          }}

          animate={{
            scale:1,
            opacity:1
          }}

          transition={{
            duration:0.8,
            type:"spring"
          }}

          className="
            relative
            flex
            items-center
            justify-center
          "

        >


          <motion.div

            animate={{
              scale:[
                1,
                1.2,
                1
              ],

              opacity:[
                0.4,
                0.8,
                0.4
              ]

            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

            className="
              absolute
              w-48
              h-48
              rounded-full
              bg-yellow-300/30
              blur-3xl
            "

          />


          <WiDaySunny

            size={120}

            className="
              text-yellow-300
              drop-shadow-2xl
            "

          />


        </motion.div>



        <motion.h1

          initial={{
            y:30,
            opacity:0
          }}

          animate={{
            y:0,
            opacity:1
          }}

          transition={{
            delay:0.4
          }}

          className="
            mt-8
            text-4xl
            md:text-5xl
            font-extrabold
            tracking-tight
          "

        >

          {APP_NAME}

        </motion.h1>



        <motion.p

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          transition={{
            delay:0.7
          }}

          className="
            mt-3
            text-white/70
            text-center
          "

        >

          Your intelligent weather companion

        </motion.p>




        <div
          className="
            mt-10
            flex
            gap-2
          "
        >

          {
            [1,2,3].map(
              (item)=>(

                <motion.span

                  key={item}

                  animate={{
                    y:[
                      0,
                      -8,
                      0
                    ]
                  }}

                  transition={{
                    duration:0.8,
                    repeat:Infinity,
                    delay:
                      item*0.15
                  }}

                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-white/80
                  "

                />

              )
            )
          }


        </div>



      </div>


    </AppBackground>


  );

}


export default SplashScreen;