const userSchema = require("../model/userSchema");

const getProfile = async (req, res, next) => {
  const { user } = req;

  try {
    const getUser = await userSchema
      .findById(user._id)
      .select("email firstName lastName")
      .lean()
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ getUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile };
