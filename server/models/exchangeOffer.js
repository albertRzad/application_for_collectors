const mongoose = require('mongoose');

const exchangeOfferSchema = new mongoose.Schema({
    message: String,
    exchangeExhibitId: String,
    exhibitId: String,
  });

  const ExchangeOffer = mongoose.model("ExchangeOffer",exchangeOfferSchema);
  
 module.exports = ExchangeOffer;

 