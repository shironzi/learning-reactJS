const express = require("express");
const multer = require("multer");

const Pet = require("./model/petSchema");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route to get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets.length) {
      return res.status(404).json({ message: "No pets found" });
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get pets by query
router.get("/pets", async (req, res) => {
  try {
    const { location, animal, breed } = req.query;
    const query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (animal) query.animal = { $regex: animal, $options: "i" };
    if (breed) query.breed = { $regex: breed, $options: "i" };

    const pets = await Pet.find(query);
    if (!pets.length) {
      return res.status(404).json({ message: "No pets found" });
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get pet by id
router.get("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a pet
router.post("/add-pet", upload.array("images"), async (req, res) => {
  const { name, location, animal, breed } = req.body;
  const images = req.files.map((file) => file.path);

  if (!name || !location || !animal || !breed || !images.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const trimmedFields = { name, location, animal, breed };
  Object.keys(trimmedFields).forEach((key) => {
    trimmedFields[key] = trimmedFields[key].trim();
  });

  const newPet = new Pet({
    ...trimmedFields,
    images,
  });

  try {
    const pet = await newPet.save();
    res.status(201).json(pet);
    console.log("Pet added successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
