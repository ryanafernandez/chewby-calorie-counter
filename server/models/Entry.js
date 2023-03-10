const { Schema, model } = require('mongoose');

const entrySchema = new Schema({
  item: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = entrySchema;
