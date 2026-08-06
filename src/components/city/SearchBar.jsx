import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdSearch, MdLocationOn } from "react-icons/md";

import { searchLocations } from "../../services/api/geocodingApi";

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchLocations(query);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (result) => {
    onSelect(result);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3">
        <MdSearch size={22} className="text-white/60" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, town, village or country"
          className="bg-transparent outline-none text-white placeholder-white/40 w-full"
        />
      </div>

      <AnimatePresence>
        {(results.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-20 mt-2 w-full bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
          >
            {loading && (
              <p className="px-4 py-3 text-white/60 text-sm">Searching...</p>
            )}

            {!loading &&
              results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition text-left"
                >
                  <MdLocationOn className="text-white/60" size={20} />

                  <div>
                    <p className="text-white text-sm">{result.name}</p>
                    <p className="text-white/50 text-xs">
                      {[result.state, result.country].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;