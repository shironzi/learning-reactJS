const express = require("express");
const path = require("path");

const {
  fetchPets,
  getPetById,
  addPet,
  addFavoritePet,
  fetchFavoritePets,
  requestAdoptPet,
  fetchAdoptionRequests,
} = require("../Controller/PetController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Route to get all pets
router.get("/", fetchPets);
// Route to search pets
router.get("/pets", fetchPets);
router.post("/add-pet", addPet);
// Route to get pet by id
router.get("/pets/:id", getPetById);
router.get("/favorites", fetchFavoritePets);
router.post("/pets/:id", getPetById);
router.put("/updatefavoritesPets/:id", addFavoritePet);
router.get("/adoption-request-list", fetchAdoptionRequests);
router.post("/requestAdoptPet", requestAdoptPet);

// Route to serve protected uploads
router.get("/protected/uploads/:filename", authenticateToken, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(filePath);
});

module.exports = router;
