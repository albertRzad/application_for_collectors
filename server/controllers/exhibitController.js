const Exhibit = require("../models/exhibit");
const Collection = require("../models/collection");

const createExhibit = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const year = req.body.year;
    const state = req.body.state;
    const collectionName = req.body.collectionName;

    const collection = await Collection.findOne({ name: collectionName });

    if (!collection) {
      return res
        .status(404)
        .json({ message: "Collection with given name not found." });
    }

    const newExhibit = new Exhibit({
        name: name,
        description: description,
        year: year,
        state: state,
        collectionName: collectionName
      });

      newExhibit.save()
      .then(() => {
        return res.status(200).json({ message: "Exhibit added."});
      })
}

module.exports = {createExhibit: createExhibit};