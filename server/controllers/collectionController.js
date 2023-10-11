const Collection = require("../models/collection");
const User = require("../models/user");

const createCollection = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const type = req.body.type;
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(404)
      .json({ message: "User with given email not found." });
  }

  const newCollection = new Collection({
    name: name,
    description: description,
    type: type,
    userId: user._id,
  });

  newCollection.save().then(() => {
    return res.status(200).json({ message: "Collection added." });
  });
};

module.exports = { createCollection: createCollection };
