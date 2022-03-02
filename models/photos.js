const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  name: String,
  path: String,
  size: Number,
  date: {type: Date, default: Date() }
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;