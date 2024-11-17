let requestCount = 0;

const express = require("express");
const path = require("path");

const {
  fetchPets,
  getPetById,
  addPet,
  addFavoritePet,
  fetchFavoritePets,
} = require("../Controller/PetController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// checks the total number of requests received
router.use((req, res, next) => {
  requestCount++;
  console.log(`Total requests received: ${requestCount}`);
  next();
});

// Route to get all pets
router.get("/", fetchPets);

// Route to search pets
router.get("/pets", fetchPets);

// Route to get pet by id
router.get("/pets/:id", getPetById);

router.get("/favorites", fetchFavoritePets);

router.post("/pets/:id", getPetById);

router.put("/updatefavoritesPets/:id", addFavoritePet);

// Route to serve protected uploads
router.get("/protected/uploads/:filename", authenticateToken, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(filePath);
});

module.exports = router;
