const Exhibit = require("../models/exhibit");
const Collection = require("../models/collection");

const createExhibit = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const year = req.body.year;
  const state = req.body.state;
  const collectionId = req.body.collectionId;
  const image = req.body.image;

  const collection = await Collection.findById({ _id: collectionId });

  if (!collection) {
    return res
      .status(404)
      .json({ message: "Collection with given id not found." });
  }

  const newExhibit = new Exhibit({
    name: name,
    description: description,
    year: year,
    state: state,
    collectionId: collectionId,
    image: image,
  });

  newExhibit.save().then(() => {
    return res.status(200).json({ message: "Exhibit added." });
  });
};

const deleteExhibit = async (req, res) => {
  const exhibitId = req.params.id;

  try {
    const exhibit = await Exhibit.findById(exhibitId);

    if (!exhibit) {
      return res.status(404).json({ message: "Exhibit not found." });
    }

    await Exhibit.findByIdAndDelete(exhibitId);
    res.status(200).json({ message: "Exhibit deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred.", error: error });
  }
};

module.exports = { createExhibit: createExhibit, deleteExhibit: deleteExhibit };
