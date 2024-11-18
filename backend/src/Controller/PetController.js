const multer = require("multer");

const Pet = require("../model/petSchema");
const User = require("../model/userSchema");
const { request } = require("http");

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
  const petId = req.params.id;
  const user = req.user;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      res.status(404).json({ message: "Pet not found" });
    }

    const isFavorite = user.favoritePets.includes(petId);
    res.status(200).json({ pet, isFavorite });
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

const fetchFavoritePets = async (req, res, next) => {
  const { user } = req;
  try {
    const favoritePets = await Pet.find({ _id: { $in: user.favoritePets } })
      .select("name location animal breed images")
      .lean()
      .exec();

    res.status(200).json({ favoritePets });
  } catch (error) {
    const customError = new Error("Failed to fetch favorite pets");
    customError.status = 500;
    next(customError);
  }
};

const addFavoritePet = async (req, res, next) => {
  const { petId } = req.body;
  const { user } = req;
  const userId = user._id;

  try {
    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (user.favoritePets.includes(petId)) {
      user.favoritePets.pull(petId);
      await user.save();
      return res.status(200).json({ message: "Pet removed from favorites" });
    }

    user.favoritePets.push(petId);
    await user.save();
    res.status(200).json({ message: "Pet added to favorites" });
  } catch (error) {
    next(error);
  }
};

// pet adoption request for the admin
const requestAdoptPet = async (req, res, next) => {
  const { petId } = req.body;
  const { user } = req;
  const userId = user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.status === "Adopted") {
      return res.status(400).json({ message: "Pet already adopted" });
    }

    if (user.adoptionRequests.includes(petId)) {
      return res.status(400).json({ message: "Adoption request already sent" });
    }

    user.adoptionRequests.push(petId);
    await user.save();
    res.status(200).json({ message: "Adoption request sent" });
  } catch (error) {
    next(error);
  }
};

const fetchAdoptionRequests = async (req, res, next) => {
  try {
    const usersWithAdoptionRequests = await User.find({
      adoptionRequests: { $exists: true, $ne: [] },
    })
      .populate("adoptionRequests.pet")
      .lean()
      .exec();

    const adoptionRequests = usersWithAdoptionRequests.flatMap((user) =>
      user.adoptionRequests.map((request) => ({
        requestId: request._id,
        petId: request.pet._id,
        status: request.status,
        name: request.pet.name,
        location: request.pet.location,
        breed: request.pet.breed,
        images: request.pet.images,
      }))
    );

    res.status(200).json({ adoptionRequests });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchPets,
  getPetById,
  addPet,
  fetchFavoritePets,
  addFavoritePet,
  requestAdoptPet,
  fetchAdoptionRequests,
};
