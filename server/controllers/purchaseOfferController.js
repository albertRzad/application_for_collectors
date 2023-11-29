const PurchaseOffer = require("../models/purchaseOffer");
const Exhibit = require("../models/exhibit");
const User = require("../models/User");

const createPurchaseOffer = async (req, res) => {
  const buyerEmail = req.body.buyerEmail;
  const sellerEmail = req.body.sellerEmail;
  const price = req.body.price;
  const message = req.body.message;
  const exhibitId = req.body.exhibitId;

  const buyer = await User.find({ email: buyerEmail });
  if (!buyer) {
    return res
      .status(404)
      .json({ message: "User with given email not found." });
  }

  const seller = await User.find({ email: sellerEmail });

  if (!seller) {
    return res.status(404).json({ message: "User with email id not found." });
  }

  const exhibit = await Exhibit.findOne({ _id: exhibitId });

  if (!exhibit) {
    return res
      .status(404)
      .json({ message: "Exhibit with given id not found." });
  }

  const newPurchaseOffer = new PurchaseOffer({
    buyerEmail: buyerEmail,
    sellerEmail: sellerEmail,
    price: price,
    message: message,
    exhibitId: exhibitId,
  });

  newPurchaseOffer.save().then(() => {
    return res.status(200).json({ message: "Purchase offer added." });
  });
};

module.exports = { createPurchaseOffer: createPurchaseOffer };
