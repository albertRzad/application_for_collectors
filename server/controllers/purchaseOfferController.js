const PurchaseOffer = require("../models/purchaseOffer");
const Exhibit = require("../models/exhibit");

const createPurchaseOffer = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const message = req.body.message;
    const exhibitId = req.body.exhibitId;

    const exhibit = await Exhibit.findOne({ _id: exhibitId });

    if (!exhibit) {
      return res
        .status(404)
        .json({ message: "Exhibit with given id not found." });
    }

    const newPurchaseOffer = new PurchaseOffer({
        name: name,
        price: price,
        message: message,
        exhibitId: exhibitId
      });

      newPurchaseOffer.save()
      .then(() => {
        return res.status(200).json({ message: "Purchase offer added."});
      })
}

module.exports = {createPurchaseOffer: createPurchaseOffer};