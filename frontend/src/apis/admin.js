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
    console.log(data);
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
    console.log(data.adoptionRequest);
    return data.adoptionRequest;
  } catch (error) {
    console.log(error);
  }
};

export { getData, getAdoptionRequests };
