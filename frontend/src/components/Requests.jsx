import { fetchAdoptionRequests } from "../apis/pets";
import { useQuery } from "@tanstack/react-query";

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

  console.log(adoptionRequest);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Adoption Requests</h2>
      {adoptionRequest.map((request) => (
        <div key={request.requestId}>
          <img
            src={`http://localhost:5000/${request.images}`}
            alt={request.name}
            loading="lazy"
          />
          <div>
            <h1>{request.name}</h1>
            <h2>{request.breed}</h2>
            <h3>{request.location}</h3>
            <h3>{request.status}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Requests;
