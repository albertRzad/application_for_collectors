const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    type: String,
    numberOfExhibits: Number,
    description: String,
    userId: String
  });

  const Collection = mongoose.model("Collection",collectionSchema)
  
 module.exports = Collection