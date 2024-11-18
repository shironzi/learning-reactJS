import { fetchAdoptionRequests } from "../apis/pets";
import { useQuery } from "@tanstack/react-query";
import AdoptionRequest from "./AdoptionRequest";

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
    <div className="AdoptionRequestList">
      <div className="AdoptionRequestList-header">
        <h2>Details</h2>
        <h2>status</h2>
      </div>
      <hr className="custom-hr" />
      {adoptionRequest.length > 0 ? (
        adoptionRequest.map((request) => (
          <div className="" key={request.requestId}>
            <AdoptionRequest
              name={request.name}
              images={request.images}
              breed={request.breed}
              location={request.location}
              status={request.status}
            />
            <hr className="custom-hr" />
          </div>
        ))
      ) : (
        <div className="no-pets-found">
          <p>
            No adoption requests found. Add some pets to your favorites to see
            them here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Requests;
