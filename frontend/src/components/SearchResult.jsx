import { memo } from "react";
import Pet from "./Pet";

// to do adding a component scroll to the results https://www.youtube.com/watch?v=31icbDtaO-k

function SearchResult(props) {
  const { pets } = props;

  return (
    <div className="searchResults">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <Pet
            key={pet._id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            image={pet.images[0]}
            id={pet._id}
          />
        ))
      ) : (
        <div className="no-pets-found">
          <i className="fas fa-paw"></i>
          <p>No pets found</p>
        </div>
      )}
    </div>
  );
}

export default memo(SearchResult);
