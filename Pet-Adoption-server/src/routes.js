const express = require("express");
const multer = require("multer");

const Pet = require("./model/petSchema");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets", async (req, res) => {
  try {
    const { animal, breed, location } = req.query;
    const query = {};
    if (animal) query.animal = animal;
    if (breed) query.breed = breed;
    if (location) query.location = location;

    const pets = await Pet.find(query);
    if (!pets.length) {
      return res.status(404).json({ message: "No pets found" });
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.post("/add-pet", upload.array("images"), async (req, res) => {
  const { name, location, animal, breed } = req.body;
  const images = req.files.map((file) => file.path);

  if (!name || !location || !animal || !breed || !images.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newPet = new Pet({
    name,
    location,
    animal,
    breed,
    images,
  });

  try {
    const pet = await newPet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
