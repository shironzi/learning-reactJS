import { useEffect, useState } from "react";

import Pet from "./Pet";

const ANIMALS = ["dog", "cat", "bird", "reptile", "rabbit"];

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  const fetchPets = async (location, animal, breed) => {
    try {
      const query = new URLSearchParams({
        location,
        type: animal,
        breed,
      }).toString();

      const response = await fetch(
        `https://api.petfinder.com/v2/animals?${query}`
      );
      const data = await response.json();
      setPets(data.animals);
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetchPets();
  };

  useEffect(() => {
    fetchPets("", "", "");
  }, []);

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
        <select value={animal} onChange={(e) => setAnimal(e.target.value)}>
          <option value="">Select Animal</option>
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="breed">Breed</label>
        <select value={breed} onChange={(e) => setBreed(e.target.value)}>
          <option value="">Select Breed</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="searchResults">
        <h1>Search Results</h1>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breeds.primary}
            />
          ))
        ) : (
          <p>No pets found</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
