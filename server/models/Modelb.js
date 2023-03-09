const { Schema, model } = require('mongoose');

const modelbSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Modelb = model('Modelb', modelbSchema);

module.exports = Modelb;
