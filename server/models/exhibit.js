const mongoose = require('mongoose');

const exhibitSchema = new mongoose.Schema({
    name: String,
    description: String,
    year: String,
    state: String,
    collectionName: String
  });

  const Exhibit = mongoose.model("Exhibit",exhibitSchema)
  
 module.exports = Exhibit