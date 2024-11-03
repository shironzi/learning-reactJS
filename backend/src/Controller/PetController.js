const multer = require("multer");

const Pet = require("../model/petSchema");

const upload = multer({ dest: "uploads/" });

const fetchPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets.length) {
      return res.status(404).json({ message: "No pets found" });
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPets = async (req, res) => {
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
};

const getAnimalsList = async (req, res) => {
  try {
    const animals = await Pet.where("animal").distinct("animal");
    if (!animals.length) {
      return res.status(404).json({ message: "No animals found" });
    }

    // sorting the animals
    animals.forEach((animal, index) => {
      animals[index] = animal.toLowerCase();
    });

    animals.sort();

    // Capitalizing the first letter of each animal
    animals.forEach((animal, index) => {
      animals[index] = animal.charAt(0).toUpperCase() + animal.slice(1);
    });

    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBreedsList = async (req, res) => {
  try {
    const { animal } = req.query;

    if (!animal) {
      return res.status(400).json({ message: "Animal is required" });
    }

    const animalRegex = { $regex: animal, $options: "i" };

    const breeds = await Pet.find({ animal: animalRegex })
      .select({ breed: 1, _id: 0 })
      .distinct("breed");

    if (!breeds.length) {
      return res.status(404).json({ message: "No breeds found" });
    }

    // sorting the breeds
    breeds.forEach((breed, index) => {
      breeds[index] = breed.toLowerCase();
    });

    breeds.sort();

    // Capitalizing the first letter of each breed
    breeds.forEach((breed, index) => {
      breeds[index] = breed.charAt(0).toUpperCase() + breed.slice(1);
    });

    res.json(breeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPet = [
  upload.array("images"),
  async (req, res) => {
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
  },
];

module.exports = {
  fetchPets,
  searchPets,
  getAnimalsList,
  getBreedsList,
  getPetById,
  addPet,
};
