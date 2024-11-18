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

export const fetchFavoritePets = async () => {
  try {
    const response = await fetchWithAuth(`http://localhost:5000/favorites`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch favorite pets");
    }

    const data = await response.json();
    return await data.favoritePets;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatefavoritesPets = async (petId) => {
  try {
    const response = await fetchWithAuth(
      `http://localhost:5000/updatefavoritesPets/${petId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add favorite pet");
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const requestAdoptPet = async (petId) => {
  try {
    const response = await fetchWithAuth(
      `http://localhost:5000/requestAdoptPet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ petId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to request pet adoption");
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchAdoptionRequests = async () => {
  try {
    const response = await fetchWithAuth(
      `http://localhost:5000/adoption-request-list`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data.adoptionRequests;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addPet = async (petData) => {
  try {
    const response = await fetchWithAuth(`http://localhost:5000/add-pet`, {
      method: "POST",
      body: petData,
    });

    if (!response.ok) {
      throw new Error("Failed to add pet");
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
