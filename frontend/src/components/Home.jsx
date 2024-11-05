import { memo, useCallback, useEffect, useState } from "react";
import { fetchPets } from "../services/petApiService";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm";

// working on search form and search result

const Home = () => {
  const [pets, setPets] = useState([]);
  const [SearchedPets, setSearchedPets] = useState([]);

  const fetchPetsData = useCallback(async () => {
    try {
      const data = await fetchPets();
      console.log("Fetching data");
      setPets(data);
      setSearchedPets(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const formSubmit = useCallback(
    (location = "", animal = "", breed = "") => {
      const filteredPets = pets.filter(
        (pet) =>
          (location ? pet.location.includes(location) : true) &&
          (animal ? pet.animal === animal : true) &&
          (breed ? pet.breed === breed : true)
      );
      console.log(location);
      setSearchedPets(filteredPets);
    },
    [pets]
  );

  useEffect(() => {
    fetchPetsData();
  }, [fetchPetsData]);

  return (
    <div className="searchForm">
      <SearchForm pets={pets} onSubmit={formSubmit} />
      <SearchResult pets={SearchedPets} />
    </div>
  );
};

export default memo(Home);
