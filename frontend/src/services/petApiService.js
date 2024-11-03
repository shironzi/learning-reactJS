export const fetchAnimalsList = async () => {
  try {
    const response = await fetch("http://localhost:5000/pets/animals");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchBreedsList = async (animal) => {
  try {
    const response = await fetch(
      `http://localhost:5000/pets/breeds?animal=${animal}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchPets = async (location = "", animal = "", breed = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (animal) queryParams.append("animal", animal);
    if (breed) queryParams.append("breed", breed);

    const response = await fetch(
      `http://localhost:5000/pets?${queryParams.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchPetById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/pets/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
