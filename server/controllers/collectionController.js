const Collection = require("../models/collection");
const User = require("../models/user");


const createCollection = async (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const description = req.body.description
  const email = req.body.email;
  
  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required." });
  }

  const nameAndDescriptionRegex = /^[A-Za-z,. -]+$/;

  if (!nameAndDescriptionRegex.test(name) || !nameAndDescriptionRegex.test(description)) {
    return res.status(400).json({ message: "Name and description must contain only letters, commas, periods, hyphens, and spaces." });
  }


  const newCollection = new Collection({
    name: name,
    description: description,
    type: type,
    ownerEmail: email,
  });

  newCollection.save().then(() => {
    return res.status(200).json({ message: "Collection added." });
  });
};

const findAllUserCollections = async (req, res) => {
  try {
    const ownerEmail = req.params.ownerEmail;
    const trimmedOwnerEmail = ownerEmail.replace(":", "");

    const collections = await Collection.find({"ownerEmail": trimmedOwnerEmail})

    res.json(collections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "There was an error" });
  }
};

const deleteCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const trimmedCollectionId = collectionId.replace(":", "");

    const deletedCollection = await Collection.findByIdAndDelete(trimmedCollectionId);

    if (!deletedCollection) {
      return res.status(404).json({ message: "Collection not found." });
    }

    res.status(200).json({ message: "Collection successfully deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "There was an error deleting the collection." });
  }
};

module.exports = { createCollection: createCollection, findAllUserCollections: findAllUserCollections, deleteCollectionById: deleteCollectionById};
