import { fetchWithAuth } from "./auth";

const getProfile = async () => {
  try {
    const response = await fetchWithAuth("http://localhost:5000/user/profile", {
      method: "GET",
    });

    const data = await response.json();
    return data.getUser;
  } catch (error) {
    console.log(error);
  }
};

export default getProfile;
