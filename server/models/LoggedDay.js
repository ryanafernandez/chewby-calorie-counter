const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const entrySchema = require('./Entry');

const loggedDaySchema = new Schema({
  loggedDay: {
    type: String,
    required: true,
  },
  loggedDayAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    // mongoose setter
  },
  entries: [entrySchema], 
});

const LoggedDay = model('LoggedDay', loggedDaySchema);

module.exports = LoggedDay;
