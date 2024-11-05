import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { fetchPets } from "../services/petApiService";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm";

const Home = () => {
  const [pets, setPets] = useState([]);

  const [renders, setRenders] = useState(0);

  const fetchPetsData = useCallback(async () => {
    try {
      const data = await fetchPets();
      setRenders(renders + 1);
      console.log("Fetching data");
      setPets(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchPetsData();
  }, [fetchPetsData]);

  return (
    <div>
      <h1>Home</h1>
      <p>Number of renders: {renders}</p>
      <SearchForm pets={pets} />
      <SearchResult pets={pets} />
    </div>
  );
};

export default memo(Home);
