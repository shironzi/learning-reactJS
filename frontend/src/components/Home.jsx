import {
  lazy,
  memo,
  useCallback,
  useEffect,
  useState,
  Suspense,
  useRef,
} from "react";
import { fetchPets } from "../services/petApiService";
import debounce from "lodash.debounce";

const SearchResults = lazy(() => import("./SearchResult"));
const SearchForm = lazy(() => import("./SearchForm"));

const Home = () => {
  const [pets, setPets] = useState([]);
  const [SearchedPets, setSearchedPets] = useState([]);
  const prevFormValues = useRef({ location: "", animal: "", breed: "" });

  const fetchPetsData = useCallback(async () => {
    try {
      const data = await fetchPets();
      setPets(data);
      setSearchedPets(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const formSubmit = debounce(
    async (location = "", animal = "", breed = "") => {
      if (
        prevFormValues.current.location === location &&
        prevFormValues.current.animal === animal &&
        prevFormValues.current.breed === breed
      ) {
        return;
      }

      prevFormValues.current = { location, animal, breed };

      const filteredPets = await fetchPets(location, animal, breed);
      setSearchedPets(filteredPets);
    },
    300
  );

  useEffect(() => {
    fetchPetsData();
  }, [fetchPetsData]);

  return (
    <div className="searchForm">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm pets={pets} onSubmit={formSubmit} />
        <SearchResults pets={SearchedPets} />
      </Suspense>
    </div>
  );
};

export default memo(Home);
