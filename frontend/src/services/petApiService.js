const getToken = () => localStorage.getItem("token");

export const fetchAnimalsList = async () => {
  try {
    const response = await fetch("http://localhost:5000/pets/animals", {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchBreedsList = async (animal) => {
  try {
    const response = await fetch(
      `http://localhost:5000/pets/breeds?animal=${animal}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      }
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
      `http://localhost:5000/pets?${queryParams.toString()}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchPetById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/pets/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
