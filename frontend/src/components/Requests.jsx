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
      {adoptionRequest.map((item) => (
        <div key={item.petId}>
          <h4>{item.name}</h4>
          <p>Pet ID: {item.petId}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Requests;
