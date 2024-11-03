import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pet from "./Pet";
import {
  fetchPets,
  fetchAnimalsList,
  fetchBreedsList,
} from "../services/petApiService";

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

    const fetchInitialPets = async () => {
      try {
        const fetchedPets = await fetchPets();
        if (fetchedPets.length !== 0) {
          setPets(fetchedPets);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    const fetchAnimals = async () => {
      try {
        const fetchedAnimals = await fetchAnimalsList();
        if (fetchedAnimals.length !== 0) {
          setAnimals(fetchedAnimals);
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
    fetchInitialPets();
  }, []);

  useEffect(() => {
    const fetchBreeds = async () => {
      if (!animal) return;
      try {
        const fetchedBreeds = await fetchBreedsList(animal);
        setBreeds(fetchedBreeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, [animal]);

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
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <label htmlFor="animal">Animal</label>
        <select
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
      <div className="searchResults">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <Pet
              key={pet._id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
              image={pet.images[0]}
              id={pet._id}
            />
          ))
        ) : (
          <div className="no-pets-found">
            <i className="fas fa-paw"></i>
            <p>No pets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
