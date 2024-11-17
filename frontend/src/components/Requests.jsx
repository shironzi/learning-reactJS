import { fetchAdoptionRequests } from "../apis/pets";
import { useQuery } from "@tanstack/react-query";
import FavoritePet from "./FavoritePet";

function Requests() {
  const {
    data: adoptionRequest = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adoptionRequest"],
    queryFn: () => fetchAdoptionRequests(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {adoptionRequest.length > 0 ? (
        adoptionRequest.map((request) => <FavoritePet props={request} />)
      ) : (
        <div>No adoption requests</div>
      )}
    </div>
  );
}

export default Requests;
