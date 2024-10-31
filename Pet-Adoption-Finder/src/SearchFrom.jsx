import { useEffect, useState } from "react";

import Pet from "./Pet";

const ANIMALS = ["dog", "cat", "bird", "rabbit"];

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState({
    name: "",
    animal: "",
    breed: "",
  });

  const fetchPets = async (location = "", animal = "", breed = "") => {
    try {
      const queryParams = new URLSearchParams();
      if (location) queryParams.append("location", location);
      if (animal) queryParams.append("animal", animal);
      if (breed) queryParams.append("breed", breed);

      const response = await fetch(
        `http://localhost:5000/pets?${queryParams.toString()}`
      );
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const cleanLocation = location.trim();
    const cleanAnimal = animal.trim();
    const cleanBreed = breed.trim();

    fetchPets(cleanLocation, cleanAnimal, cleanBreed);
  };

  useEffect(() => {
    fetchPets();
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
              key={pet._id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breeds}
              image={pet.images[0]}
              id={pet._id}
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
