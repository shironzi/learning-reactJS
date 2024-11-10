const petSchema = require("../model/petSchema");
const userSchema = require("../model/userSchema");

exports.getData = async (req, res) => {
  try {
    const [users, pets] = await Promise.all([
      userSchema.estimatedDocumentCount(),
      petSchema.estimatedDocumentCount(),
    ]);
    res.json({ users, pets });
  } catch (error) {
    console.log(error);
  }
};
