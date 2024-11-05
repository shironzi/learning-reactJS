import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!name || !location || !animal || !breed || images.length === 0) {
        console.log("Form is incomplete");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("animal", animal);
      formData.append("breed", breed);
      images.forEach((image) => {
        formData.append("images", image); // Use "images" as the field name
      });

      try {
        const response = await fetch("http://localhost:5000/add-pet", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Pet added successfully");
          navigate("/");
        } else {
          console.log("Failed to add pet");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [name, location, animal, breed, images, navigate]
  );

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="location">Location: </label>
      <input
        type="text"
        name="location"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label htmlFor="animal">Animal: </label>
      <input
        type="text"
        name="animal"
        id="animal"
        value={animal}
        onChange={(e) => setAnimal(e.target.value)}
      />
      <label htmlFor="breed">Breed: </label>
      <input
        type="text"
        name="breed"
        id="breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      />
      <label htmlFor="images">Images: </label>
      <input
        type="file"
        name="images"
        className="file-input"
        id="images"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
      />
      <button type="submit" className="form-container-button">
        Add Pet
      </button>
    </form>
  );
};

export default memo(AddPet);
