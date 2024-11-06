import { lazy, memo, useCallback, useEffect, useState, Suspense } from "react";
import { fetchPets } from "../services/petApiService";

const SearchResults = lazy(() => import("./SearchResult"));
const SearchForm = lazy(() => import("./SearchForm"));

const Home = () => {
  const [pets, setPets] = useState([]);
  const [searchedPets, setSearchedPets] = useState([]);

  const fetchPetsData = useCallback(async () => {
    try {
      const data = await fetchPets();
      setPets(data);
      setSearchedPets(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const formSubmit = useCallback(
    async (location = "", animal = "", breed = "") => {
      try {
        if (
          searchedPets.location === location &&
          searchedPets.animal === animal &&
          searchedPets.breed === breed
        )
          return;
        const filteredPets = await fetchPets(location, animal, breed);
        setSearchedPets(filteredPets);
      } catch (error) {
        console.error("Error fetching filtered pets:", error);
      }
    },
    [searchedPets]
  );

  useEffect(() => {
    fetchPetsData();
  }, [fetchPetsData]);

  return (
    <div className="searchForm">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm pets={pets} onSubmit={formSubmit} />
        <SearchResults pets={searchedPets} />
      </Suspense>
    </div>
  );
};

export default memo(Home);
