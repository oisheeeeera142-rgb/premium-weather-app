import {
  useState,
  useEffect
} from "react";


import {
  MdSearch,
  MdClose
} from "react-icons/md";


import {
  motion,
  AnimatePresence
} from "framer-motion";


import GlassCard
from "../common/GlassCard";


import {
  searchCities
}
from "../../services/api/geocodingApi";



function CitySearch({
  onSelect
}) {


  const [
    query,
    setQuery
  ] = useState("");



  const [
    results,
    setResults
  ] = useState([]);



  const [
    loading,
    setLoading
  ] = useState(false);



  useEffect(() => {


    const timer =
      setTimeout(
        async () => {


          if(
            query.trim().length < 2
          ){

            setResults([]);

            return;

          }



          try {


            setLoading(true);



            const data =
              await searchCities(
                query
              );



            setResults(
              data || []
            );



          }
          catch(error){


            console.error(
              error
            );


            setResults([]);

          }
          finally{

            setLoading(false);

          }


        },

        500
      );



    return () =>
      clearTimeout(timer);



  },[
    query
  ]);





  const handleSelect =
    (city)=>{


      onSelect(
        city
      );


      setQuery("");

      setResults([]);

    };





  const clearSearch =
    ()=>{


      setQuery("");

      setResults([]);


    };





  return (

    <div
      className="
        relative
        w-full
      "
    >



      <GlassCard

        className="
          p-4
          flex
          items-center
          gap-3
        "

      >


        <MdSearch

          size={26}

          className="
            text-white/60
          "

        />



        <input


          value={
            query
          }


          onChange={
            (e)=>
            setQuery(
              e.target.value
            )
          }


          placeholder="
            Search city...
          "


          className="
            flex-1
            bg-transparent
            outline-none
            text-white
            placeholder:text-white/50
          "


        />




        {
          query && (

            <button

              onClick={
                clearSearch
              }


            >

              <MdClose

                size={24}

                className="
                  text-white/60
                "

              />

            </button>

          )
        }



      </GlassCard>





      <AnimatePresence>


      {
        (
          results.length > 0 ||
          loading
        )

        &&

        (

        <motion.div


          initial={{
            opacity:0,
            y:-10
          }}


          animate={{
            opacity:1,
            y:0
          }}


          exit={{
            opacity:0,
            y:-10
          }}



          className="
            absolute
            top-full
            mt-3
            left-0
            right-0
            z-50
          "


        >



        <GlassCard

          className="
            p-3
            space-y-2
          "

        >



        {
          loading ?


          (

          <p

            className="
              text-white/70
              text-center
              py-4
            "

          >

            Searching...

          </p>

          )

          :


          results.map(

            (city,index)=>(


              <button


                key={
                  index
                }


                onClick={() =>
                  handleSelect(
                    city
                  )
                }



                className="
                  w-full
                  text-left
                  p-3
                  rounded-xl
                  hover:bg-white/10
                  transition
                  text-white
                "


              >



                <p
                  className="
                    font-semibold
                  "
                >

                  {
                    city.name
                  }

                </p>



                <p
                  className="
                    text-sm
                    text-white/60
                  "
                >

                  {
                    city.state &&
                    `${city.state}, `
                  }


                  {
                    city.country
                  }

                </p>



              </button>


            )


          )


        }



        </GlassCard>



        </motion.div>


        )

      }


      </AnimatePresence>




    </div>


  );


}


export default CitySearch;