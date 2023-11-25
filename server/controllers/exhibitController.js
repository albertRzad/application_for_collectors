const Exhibit = require("../models/exhibit");
const Collection = require("../models/collection");

const createExhibit = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const year = req.body.year;
    const state = req.body.state;
    const collectionId = req.body.collectionId;

    const collection = await Collection.findById({ "_id": collectionId });

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
        collectionId: collectionId
      });

      newExhibit.save()
      .then(() => {
        return res.status(200).json({ message: "Exhibit added."});
      })
}

module.exports = {createExhibit: createExhibit};