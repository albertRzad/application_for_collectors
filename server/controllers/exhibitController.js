const Collection = require("../models/exhibit")

const createExhibit = async (req, res) => {
    const name = req.body.name;
    const description = req.body.surname;
    const year = req.body.email;
    const state = req.body.password;
    const collectionId = req.body.collectionId;

    const newExhibit = new Exhibit({
        name: name,
        description: description,
        year: year,
        state: state,
        collectionId: collectionId
      });

      newExhibit.save()
      .then(() => {
        console.log("SAVED")
        return res.status(200).json({ message: "Exhibit added."});
      })
}