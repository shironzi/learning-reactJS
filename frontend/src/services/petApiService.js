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
