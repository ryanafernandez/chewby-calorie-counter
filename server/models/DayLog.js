const { Schema, model } = require('mongoose');
const entrySchema = require('./Entry');

const dayLogSchema = new Schema({
    day: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    breakfast: [entrySchema],
    lunch: [entrySchema],
    dinner: [entrySchema],
    water: {
        type: Number,
        trim: true,
    },
});

const DayLog = model('DayLog', dayLogSchema);

module.exports = DayLog;