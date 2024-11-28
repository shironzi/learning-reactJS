import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPet } from "../apis/pets";

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    animal: "",
    breed: "",
    description: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: Array.from(e.target.files),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const { name, location, animal, breed, images, description } = formData;
        if (
          !name ||
          !location ||
          !animal ||
          !breed ||
          !description ||
          images.length === 0
        ) {
          console.log("Form is incomplete");
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", name);
        formDataToSend.append("location", location);
        formDataToSend.append("animal", animal);
        formDataToSend.append("breed", breed);
        formDataToSend.append("description", description);
        images.forEach((image) => {
          formDataToSend.append("images", image);
        });

        await addPet(formDataToSend);
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [formData, navigate]
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
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="location">Location: </label>
      <input
        type="text"
        name="location"
        id="location"
        value={formData.location}
        onChange={handleChange}
      />
      <label htmlFor="animal">Animal: </label>
      <input
        type="text"
        name="animal"
        id="animal"
        value={formData.animal}
        onChange={handleChange}
      />
      <label htmlFor="breed">Breed: </label>
      <input
        type="text"
        name="breed"
        id="breed"
        value={formData.breed}
        onChange={handleChange}
      />
      <label htmlFor="description">Description: </label>
      <textarea
        className="form-container-textarea"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        rows="5"
      />
      <input
        type="file"
        name="images"
        className="file-input"
        id="images"
        multiple
        onChange={handleFileChange}
      />
      <button type="submit" className="form-container-button">
        Add Pet
      </button>
    </form>
  );
};

export default memo(AddPet);
