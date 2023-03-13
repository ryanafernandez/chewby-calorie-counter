const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const entrySchema = require('./Entry');

const loggedDaySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    // mongoose setter
  },
  loggedDayAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  entries: [entrySchema], 
});

const LoggedDay = model('LoggedDay', loggedDaySchema);

module.exports = LoggedDay;
