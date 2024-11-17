import { Link } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function AdoptionRequest({ request, name }) {
  return (
    <div className="adoption-request-card">
      <div className="adoption-request-header">
        <h4>Adoption Request by: {name}</h4>
        <Link className="adoption-request-header-link">
          <span>View Profile</span>
        </Link>
      </div>
      <hr className="custom-hr" />
      <div className="adoption-request-content">
        <img
          src={`http://localhost:5000/${request.images}`}
          alt={request.name}
          loading="lazy"
          className="adoption-request-image"
        />
        <div className="adoption-request-details">
          <h2>{request.name}</h2>
          <h4>Breed: {request.breed}</h4>
          <h4>Location: {request.location}</h4>
        </div>
        <div className="adoption-request-button-container">
          <button className="adoption-request-approve">
            <CheckIcon fontSize="large" />
          </button>
          <button className="adoption-request-reject">
            <CloseIcon fontSize="large" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdoptionRequest;
