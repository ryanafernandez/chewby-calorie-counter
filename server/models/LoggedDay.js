const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const loggedDaySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  loggedDayAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  entry: {
    type: String,
    required: 'You need to leave an entry!',
    minlength: 1,
    maxlength: 200,
    trim: true,
  },
  // entry: [
  //   {
  //       type: Schema.Types.ObjectId,
  //       ref: 'Entry',   
  //   },
  // ], 
});

const LoggedDay = model('LoggedDay', loggedDaySchema);

module.exports = LoggedDay;
