const Pet = require("../model/petSchema");
const User = require("../model/userSchema");

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

module.exports = { getData, petAdoptionList };
