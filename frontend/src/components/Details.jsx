import { useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CustomDialog from "./CustomDialog";
import { fetchPetById } from "../apis/pets";

const Details = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAdopt = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await fetchPetById(id);
        setPet(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPet();
  }, [id]);

  if (!pet) {
    return (
      <div className="loading-container">
        <img src="/loading-paws.gif" alt="Loading" className="loading-image" />
      </div>
    );
  }

  return (
    <div className="pet-details">
      <div className="pet-details-image-container">
        {pet.images &&
          pet.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt={`Pet ${index}`}
            />
          ))}
      </div>
      <div className="pet-details-about">
        <div className="pet-details-header">
          <h1>{pet.name}</h1>
          <button
            className={
              isFavorite ? "pet-details-favorite" : "pet-details-isFavorite"
            }
            onClick={handleFavorite}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
        </div>
        <h4>Breed: {pet.breed}</h4>
        <h2>Description</h2>
        <p>{pet.description ? pet.description : "No description available"}</p>
        <h1>About</h1>
        <h4>HEALTH</h4>
        <p>Vaccinations up to date, spayed / neutered.</p>

        <h4>Adoption fee</h4>
        <p>$100.00</p>
        <button className="pet-details-adoption-button" onClick={handleAdopt}>
          Adopt Me!
        </button>
        <CustomDialog open={open} onClose={handleAdopt} pet={pet} />
      </div>
    </div>
  );
};

export default memo(Details);
