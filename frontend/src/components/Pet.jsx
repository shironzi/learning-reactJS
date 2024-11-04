import { memo } from "react";
import { Link } from "react-router-dom";

const Pet = (props) => {
  return (
    <div className="pet">
      <img
        src={`http://localhost:5000/${props.image}`}
        alt={props.name}
        loading="lazy"
      />
      <div>
        <h1>{props.name}</h1>
        <h2>{props.animal}</h2>
        <h3>({props.breed})</h3>
      </div>
      <Link className="pet-more-info" to={`/pets/${props.id}`}>
        More Info
      </Link>
    </div>
  );
};

export default memo(Pet);
