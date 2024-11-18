const Pet = require("../model/petSchema");
const User = require("../model/userSchema");
const adoptionData = require("../model/adoptionHistory");

const getData = async (req, res) => {
  try {
    const [users, pets, activeUsers, newUsers] = await Promise.all([
      User.estimatedDocumentCount(),
      Pet.estimatedDocumentCount(),
      User.find({
        lastLogin: {
          $gte: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      }).countDocuments(),
      User.find({
        createdAt: {
          $gte: new Date(new Date() - 168 * 60 * 60 * 1000),
        },
      }).countDocuments(),
    ]);

    res.status(200).json({ users, pets, activeUsers, newUsers });
  } catch (error) {
    next(error);
  }
};

const petAdoptionList = async (req, res, next) => {
  // const { user } = req;
  // const userId = user._id;

  try {
    // const admin = await User.findById(userId)
    //   .select("role")
    //   .equals("admin")
    //   .exec();

    // if (!admin) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    const adoptionRequest = await User.find({
      adoptionRequests: { $exists: true, $ne: [] },
    })
      .populate("adoptionRequests.pet")
      .select("firstName lastName adoptionRequests")
      .lean()
      .exec();

    res.status(200).json({ adoptionRequest });
  } catch (error) {
    next(error);
  }
};

const updateAdoptionRequest = async (req, res, next) => {
  const { user } = req;
  const { requestId, status, petId, userId } = req.body;

  try {
    // const admin = await User.findById(user._id)
    //   .select("role")
    //   .equals("admin")
    //   .exec();

    // if (!admin) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    const data = {
      _id: requestId,
      userId: userId,
      pet: petId,
      status: status,
      date: new Date(),
    };

    const adoptionUpdate = new adoptionData(data);
    await adoptionUpdate.save();

    const userUpdateStatus = await User.findOneAndUpdate(
      { _id: userId, "adoptionRequests._id": requestId },
      { $set: { "adoptionRequests.$.status": status } }
    );

    const petUpdateStatus = await Pet.findOneAndUpdate(
      { _id: petId },
      { $set: { status: status === "Approved" ? "adopted" : "available" } }
    );

    if (!petUpdateStatus) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (!userUpdateStatus) {
      return res.status(404).json({ message: "Adoption Request not found" });
    }

    petUpdateStatus.save();
    userUpdateStatus.save();

    res.status(200).json({ message: "Adoption Request updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getData, petAdoptionList, updateAdoptionRequest };
