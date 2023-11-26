const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    ownerEmail: String,
    image: String,
    likes: Number
  });

  const Collection = mongoose.model("Collection",collectionSchema)
  
 module.exports = Collection