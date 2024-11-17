import FavoritePet from "./FavoritePet";
import { memo } from "react";

function FavoritePetLists(props) {
  const { pets, onRemovePet } = props;

  return (
    <div className="searchResults">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <FavoritePet
            key={pet._id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            image={pet.images[0]}
            id={pet._id}
            onRemovePet={onRemovePet}
          />
        ))
      ) : (
        <div className="no-pets-found">
          <p>
            No favorite pets found. Add some pets to your favorites to see them
            here!
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(FavoritePetLists);
