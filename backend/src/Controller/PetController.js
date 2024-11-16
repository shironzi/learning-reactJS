const multer = require("multer");

const Pet = require("../model/petSchema");

const upload = multer({ dest: "uploads/" });

const fetchPets = async (req, res) => {
  try {
    const { location, animal, breed } = req.query;
    const query = {};
    if (location) query.location = { $regex: location, $options: "i" };
    if (animal) query.animal = { $regex: animal, $options: "i" };
    if (breed) query.breed = { $regex: breed, $options: "i" };

    const pets = await Pet.find(query)
      .select("name location animal breed images")
      .lean()
      .skip(0)
      .limit(10)
      .exec();

    const animalsAndBreeds = await Pet.find()
      .select("animal breed")
      .lean()
      .exec();

    res.status(200).json({ pets, animalsAndBreeds });
  } catch (error) {
    next(error);
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
    next(error);
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
      next(error);
    }
  },
];

module.exports = {
  fetchPets,
  getPetById,
  addPet,
};
