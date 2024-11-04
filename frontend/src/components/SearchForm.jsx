import React, { useEffect, useState, memo, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPets, getPets, getBreeds } from "../services/petApiService";

const LazySearchResult = React.lazy(() => import("./SearchResult"));

const SearchForm = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedPets = await fetchPets();

        if (!fetchedPets) {
          return;
        }
        const petList = await getPets(fetchedPets);

        setPets(fetchedPets);
        setAnimals(petList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (!animal) return;
    const getBreedsList = async () => {
      try {
        const fetchedBreeds = await getBreeds(pets, animal);
        if (fetchedBreeds.length === 0) {
          return;
        }
        setBreeds(fetchedBreeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    getBreedsList();
  }, [animal, pets]);

  const submitForm = async (e) => {
    e.preventDefault();
    const cleanLocation = location.trim();
    const cleanAnimal = animal.trim();
    const cleanBreed = breed.trim();

    try {
      const fetchedPets = await fetchPets(
        cleanLocation,
        cleanAnimal,
        cleanBreed
      );
      setPets(fetchedPets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  return (
    <div className="searchForm">
      <form onSubmit={submitForm}>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <label htmlFor="animal">Animal</label>
        <select
          name="animal"
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
            setBreed("");
          }}
        >
          <option value="">Select Animal</option>
          {animals.length > 0 ? (
            animals.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No animals available
            </option>
          )}
        </select>
        <br />
        <label htmlFor="breed">Breed</label>
        <label htmlFor="breed">Breed</label>
        <select
          name="breed"
          id="breed"
          value={breed}
          onChange={(e) => {
            setBreed(e.target.value);
          }}
          disabled={breeds.length === 0 || animal === ""}
        >
          <option value="">Select Breed</option>
          {breeds.length > 0 && animal !== "" ? (
            breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No breeds available
            </option>
          )}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <LazySearchResult pets={pets} />
      </Suspense>
    </div>
  );
};

export default memo(SearchForm);
