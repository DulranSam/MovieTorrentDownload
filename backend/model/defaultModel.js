const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
  },
  addresses: {
    default: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shipping: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
});

const dataModel = mongoose.model("users", dataSchema);
module.exports = dataModel;
