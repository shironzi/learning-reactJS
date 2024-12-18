import CloseIcon from "@mui/icons-material/Close";
import { memo, useCallback } from "react";

function FavoritePet(props) {
  const handleRemovePet = useCallback(async () => {
    props.onRemovePet(props.id);
  }, [props]);

  return (
    <div className="favoritePet-container">
      <img
        src={`http://localhost:5000/${props.image}`}
        alt={props.name}
        loading="lazy"
      />
      <div>
        <h1>{props.name}</h1>
        <h2>{props.breed}</h2>
      </div>
      <div>
        <button className="favoritePet-remove" onClick={handleRemovePet}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default memo(FavoritePet);
