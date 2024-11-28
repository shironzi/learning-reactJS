import React, { memo } from "react";

function AdoptionRequest(props) {
  return (
    <div className="adoptionRequest-container">
      <div className="adoptionRequest-details">
        <img
          src={`http://localhost:5000/${props.images}`}
          alt={props.name}
          loading="lazy"
        />
        <div>
          <h1>{props.name}</h1>
          <h4>Breed: {props.breed}</h4>
          <h4>Location: {props.location}</h4>
        </div>
      </div>

      <h3>{props.status}</h3>
    </div>
  );
}

export default memo(AdoptionRequest);
