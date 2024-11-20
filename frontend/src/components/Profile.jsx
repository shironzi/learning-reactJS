import { useQuery } from "@tanstack/react-query";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import getProfile from "../apis/user";
import Loading from "./Loading";

function Profile() {
  const {
    data: userData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getProfile(),
  });

  console.log(userData);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt={"userData.firstName + userData.lastName"}
          className="profile-pic"
        />
        <div className="profile-details">
          <h2>Name: {userData.firstName + " " + userData.lastName}</h2>
          <p>Email: {userData.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
