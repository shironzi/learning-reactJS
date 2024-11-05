import { memo, useCallback, useEffect, useMemo, useState } from "react";

function SearchForm({ pets, onSubmit }) {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [availableBreeds, setAvailableBreeds] = useState([]);

  const memoizedPets = useMemo(() => {
    return pets;
  }, [pets]);

  // Get unique animals
  const animals = useMemo(() => {
    const uniqueAnimals = new Set();
    memoizedPets.forEach((pet) => uniqueAnimals.add(pet.animal));

    const animalList = Array.from(uniqueAnimals);
    animalList.sort();
    return animalList;
  }, [memoizedPets]);

  // Get unique breeds for selected animal
  const breeds = useCallback(() => {
    if (!animal) return [];
    const uniqueBreeds = new Set();
    memoizedPets.forEach((pet) => {
      if (pet.animal === animal) uniqueBreeds.add(pet.breed);
    });

    const breedList = Array.from(uniqueBreeds);
    breedList.sort();
    setAvailableBreeds(breedList);
  }, [animal, memoizedPets]);

  // Fetch breeds when animal changes
  useEffect(() => {
    breeds();
  }, [breeds]);

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(location, animal, breed);
    },
    [location, animal, breed, onSubmit]
  );

  return (
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
        disabled={availableBreeds.length === 0 || animal === ""}
      >
        <option value="">Select Breed</option>
        {availableBreeds.length > 0 && animal !== "" ? (
          availableBreeds.map((breed) => (
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
  );
}

export default memo(SearchForm);
