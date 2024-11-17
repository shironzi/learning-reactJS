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
      {adoptionRequests.length > 0 ? (
        <>
          {adoptionRequests.map((adoptionRequest) => {
            return (
              <AdoptionRequest
                key={adoptionRequest._id}
                name={
                  adoptionRequest.firstName + " " + adoptionRequest.lastName
                }
                request={adoptionRequest.adoptionRequests[0]}
              />
            );
          })}
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
