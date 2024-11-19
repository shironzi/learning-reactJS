import { Link } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { updateAdoptionRequest } from "../../apis/admin";

function AdoptionRequest({ request, name, userId }) {
  const handleApprove = (req) => async () => {
    await updateAdoptionRequest(req._id, "approved", req.pet._id, userId);
  };

  const handleReject = (req) => async () => {
    await updateAdoptionRequest(req._id, "rejected", req.pet._id, userId);
  };

  return (
    <div className="adoption-request-card">
      <div className="adoption-request-header">
        <h4>Adoption Request by: {name}</h4>
        <Link className="adoption-request-header-link">
          <span>View Profile</span>
        </Link>
      </div>
      <hr className="custom-hr" />

      {request.length > 1 ? (
        request.map((req) => (
          <div className="adoption-request-content" key={req._id}>
            <div className="adoptionRequest-details">
              <img
                src={`http://localhost:5000/${req.pet.images}`}
                alt={req.pet.name}
                loading="lazy"
                className="adoption-request-image"
              />
              <div className="adoption-request-details">
                <h2>{req.pet.name}</h2>
                <h4>Breed: {req.pet.breed}</h4>
                <h4>Location: {req.pet.location}</h4>
              </div>
            </div>
            <div className="adoption-request-button-container">
              <button
                className="adoption-request-approve"
                onClick={handleApprove(req, request.firstName)}
              >
                <CheckIcon fontSize="large" />
              </button>
              <button
                className="adoption-request-reject"
                onClick={handleReject(req, request.firstName)}
              >
                <CloseIcon fontSize="large" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="adoption-request-content" key={request._id}>
          <img
            src={`http://localhost:5000/${request.pet.images}`}
            alt={request.pet.name}
            loading="lazy"
            className="adoption-request-image"
          />
          <div className="adoption-request-details">
            <h2>{request.pet.name}</h2>
            <h4>Breed: {request.pet.breed}</h4>
            <h4>Location: {request.pet.location}</h4>
          </div>
          <div className="adoption-request-button-container">
            <button
              className="adoption-request-approve"
              onClick={handleApprove}
            >
              <CheckIcon fontSize="large" />
            </button>
            <button className="adoption-request-reject" onClick={handleApprove}>
              <CloseIcon fontSize="large" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdoptionRequest;
