import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Details = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({
    name: "",
    breed: "",
    description: "",
    image: "",
  });

  const fetchPet = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pets/${id}`);
      const data = await response.json();
      setPet(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="pet-details">
      <div>
        <img src={pet.image} alt={pet.name} />
      </div>
      <div>
        <h1>Pet Name: {pet.name}</h1>
        <h2>Breed: {pet.breed}</h2>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;
