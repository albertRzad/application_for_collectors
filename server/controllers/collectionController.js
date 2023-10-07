const Collection = require("../models/collection")

const createCollection = async (req, res) => {
    const name = req.body.name;
    const description = req.body.surname;
    const type = req.body.email;
    const numberOfExhibits = req.body.password;

    const newCollection = new Collection({
        name: name,
        description: description,
        type: type,
        numberOfExhibits: numberOfExhibits
      });

      newCollection.save()
      .then(() => {
        console.log("SAVED")
        return res.status(200).json({ message: "Exhibit added."});
      })
}