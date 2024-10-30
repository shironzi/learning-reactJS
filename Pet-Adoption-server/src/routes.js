const express = require("express");

const Pet = require("./model/petSchema");

const router = express.Router();

router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets?animal=:animal", async (req, res) => {
  try {
    const pets = await Pet.find({ animal: req.params.animal });
    if (!pets) {
      res.status(404).json({ message: "No pets found" });
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets?breed=:breed", async (req, res) => {
  try {
    const pets = await Pet.find({ breed: req.params.breed });
    if (!pets) {
      res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets?location=:location", async (req, res) => {
  try {
    const pets = await Pet.find({ location: req.params.location });
    if (!pets) {
      res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets?animal=:animal&breed=:breed", async (req, res) => {
  try {
    const pets = await Pet.find({
      animal: req.params.animal,
      breed: req.params.breed,
    });
    if (!pets) {
      res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets?animal=:animal&location=:location", async (req, res) => {
  try {
    const pets = await Pet.find({
      animal: req.params.animal,
      location: req.params.location,
    });
    if (!pets) {
      res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pets?breed=:breed&location=:location", async (req, res) => {
  try {
    const pets = await Pet.find({
      breed: req.params.breed,
      location: req.params.location,
    });
    if (!pets) {
      res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/pets?animal=:animal&breed=:breed&location=:location",
  async (req, res) => {
    try {
      const pets = await Pet.find({
        animal: req.params.animal,
        breed: req.params.breed,
        location: req.params.location,
      });
      if (!pets) {
        res.status(404).json({ message: "No pets found" });
      }
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

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

module.exports = router;
