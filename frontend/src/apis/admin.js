import { fetchWithAuth } from "./auth";

const getData = async () => {
  try {
    const response = await fetchWithAuth(
      "http://localhost:5000/admin/getData",
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAdoptionRequests = async () => {
  try {
    const response = await fetchWithAuth(
      "http://localhost:5000/admin/adoptionRequest",
      {
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateAdoptionRequest = async (requestId, status, petId, userId) => {
  try {
    const response = await fetchWithAuth(
      "http://localhost:5000/admin/updateAdoptionRequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, status, petId, userId }),
      }
    );

    if (response.status === 400) {
      alert("Adoption request update failed");
    }
  } catch (error) {
    alert("Failed to update request");
  }
};

export { getData, getAdoptionRequests, updateAdoptionRequest };
