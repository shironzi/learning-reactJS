export const fetchPets = async (location = "", animal = "", breed = "") => {
  const getToken = () => localStorage.getItem("token");
  const token = getToken();
  try {
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (animal) queryParams.append("animal", animal);
    if (breed) queryParams.append("breed", breed);

    const response = await fetch(
      `http://localhost:5000/pets?${queryParams.toString()}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return await data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const petsData = [fetchPets()];

export const getPets = async (data) => {
  try {
    const animals = data.map((pet) => pet.animal);
    const uniqueAnimals = [...new Set(animals)];

    uniqueAnimals.sort();
    return uniqueAnimals;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getBreeds = async (pets, animal) => {
  try {
    const breedsList = pets
      .filter((pet) => pet.animal === animal)
      .map((pet) => {
        return pet.breed;
      });

    const uniqueBreeds = [...new Set(breedsList)];
    uniqueBreeds.sort();
    return uniqueBreeds;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const fetchPetById = async (id) => {
  const getToken = () => localStorage.getItem("token");
  const token = getToken();
  try {
    const response = await fetch(`http://localhost:5000/pets/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
