import { useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Alert, AlertTitle } from "@mui/material";

import CustomDialog from "./CustomDialog";
import { fetchPetById, updatefavoritesPets } from "../apis/pets";
import Loading from "./Loading";

const Details = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);

  const handleAdopt = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    updatefavoritesPets(id);
  }, [isFavorite, id]);

  const { isLoading, error, data } = useQuery("pet", () => fetchPetById(id));

  useEffect(() => {
    if (data) {
      setIsFavorite(data.isFavorite);
      setPet(data.pet);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="pet-details">
      {warningAlert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong, please try again later.
        </Alert>
      )}
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
        <hr className="custom-hr" />
        <h2>Description</h2>
        <p>{pet.description ? pet.description : "No description available"}</p>

        <hr className="custom-hr" />
        <h1>About</h1>
        <h4>HEALTH</h4>
        <p>Vaccinations up to date, spayed / neutered.</p>

        <h4>Adoption fee</h4>
        <p>$100.00</p>
        <button className="pet-details-adoption-button" onClick={handleAdopt}>
          Adopt Me!
        </button>
        <CustomDialog
          open={open}
          onClose={handleAdopt}
          pet={pet}
          warningAlert={setWarningAlert}
        />
      </div>
    </div>
  );
};

export default memo(Details);
