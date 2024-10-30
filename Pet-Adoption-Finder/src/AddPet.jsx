import { useState } from "react";

const AddPet = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [images, setImages] = useState([]);

  return (
    <form>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="location">Location: </label>
      <input
        type="text"
        name="location"
        id="location"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <label htmlFor="animal">Animal: </label>
      <input
        type="text"
        name="animal"
        id="animal"
        value={animal}
        onChange={(e) => {
          setAnimal(e.target.value);
        }}
      />
      <label htmlFor="breed"> Breed: </label>
      <input
        type="text"
        name="breed"
        id="breed"
        value={breed}
        onChange={(e) => {
          setBreed(e.target.value);
        }}
      />
      <label htmlFor="images">Images: </label>
      <input
        type="file"
        name="images"
        id="images"
        value={images}
        onChange={(e) => {
          setImages(e.target.value);
        }}
      />
    </form>
  );
};

export default AddPet;
