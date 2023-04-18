const { Schema } = require('mongoose');

const entrySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
    trim: true,
  },
  protein: {
    type: Number,
    trim: true,
  },
  fat: {
    type: Number,
    trim: true,
  },
  carbs: {
    type: Number,
    trim: true,
  }
});

module.exports = entrySchema;
