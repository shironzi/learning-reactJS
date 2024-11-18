import { fetchAdoptionRequests } from "../apis/pets";
import { useQuery } from "@tanstack/react-query";
import AdoptionRequest from "./AdoptionRequest";

function Requests() {
  const {
    data: adoptionRequests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adoptionRequests"],
    queryFn: () => fetchAdoptionRequests(),
  });

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
      {adoptionRequests.length > 0 ? (
        adoptionRequests.map((request) => (
          <div className="" key={request.requestId}>
            <AdoptionRequest
              name={request.petName}
              images={request.petImages}
              breed={request.petBreed}
              location={request.petLocation}
              status={request.petAdoptionStatus}
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
