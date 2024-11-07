import { fetchWithAuth } from "./auth";

export const fetchPets = async (location = "", animal = "", breed = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (animal) queryParams.append("animal", animal);
    if (breed) queryParams.append("breed", breed);

    const response = await fetchWithAuth(
      `http://localhost:5000/pets?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }

    const data = await response.json();
    return await data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchPetById = async (id) => {
  try {
    const response = await fetchWithAuth(`http://localhost:5000/pets/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch pet by ID");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
