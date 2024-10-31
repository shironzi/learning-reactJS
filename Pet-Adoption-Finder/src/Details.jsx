import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Details = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pets/${id}`);
        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div>
        {pet.images &&
          pet.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt={`Pet ${index}`}
            />
          ))}
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
