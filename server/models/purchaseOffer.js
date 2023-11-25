const mongoose = require("mongoose");

const purchaseOfferSchema = new mongoose.Schema({
  name: String,
  price: Number,
  message: String,
  exhibitId: String,
});

const PurchaseOffer = mongoose.model("PurchaseOffer", purchaseOfferSchema);

module.exports = PurchaseOffer;
