import { useQuery } from "@tanstack/react-query";

import AdoptionRequest from "./AdoptionRequest";
import { getAdoptionRequests } from "../../apis/admin";

function PetAdoptionReqeuest() {
  const {
    data: adoptionRequests = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["adoptionRequests"],
    queryFn: () => getAdoptionRequests(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {adoptionRequests.adoptionRequest.length > 0 ? (
        <>
          {adoptionRequests.adoptionRequest.length > 1 ? (
            adoptionRequests.adoptionRequest.map((request) => (
              <AdoptionRequest
                request={request.adoptionRequests}
                name={`${request.firstName} ${request.lastName}`}
                userId={request._id}
                key={request._id}
              />
            ))
          ) : (
            <h1>two</h1>
          )}
        </>
      ) : (
        <div>
          <p>No pet adoption requests found</p>
        </div>
      )}
    </>
  );
}

export default PetAdoptionReqeuest;
