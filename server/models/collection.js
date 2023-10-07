const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    type: String,
    numberOfExhibits: Number,
    description: String,
  });

  const Collection = mongoose.model("Collection",collectionSchema)
  
 module.exports = Collection