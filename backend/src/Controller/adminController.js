const petSchema = require("../model/petSchema");
const userSchema = require("../model/userSchema");

exports.getData = async (req, res) => {
  try {
    const [users, pets, activeUsers, newUsers] = await Promise.all([
      userSchema.estimatedDocumentCount(),
      petSchema.estimatedDocumentCount(),
      userSchema
        .find({
          lastLogin: {
            $gte: new Date(new Date() - 24 * 60 * 60 * 1000),
          },
        })
        .countDocuments(),
      userSchema
        .find({
          createdAt: {
            $gte: new Date(new Date() - 168 * 60 * 60 * 1000),
          },
        })
        .countDocuments(),
    ]);

    res.status(200).json({ users, pets, activeUsers, newUsers });
  } catch (error) {
    console.log(error);
  }
};
