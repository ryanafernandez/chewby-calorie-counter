const { Schema, model } = require('mongoose');

const dayLogSchema = new Schema({
    day: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    breakfast: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Food',
        },
    ],
    lunch: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Food',
        },
    ],
    dinner: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Food',
        },
    ],
    water: {
        type: Number,
        trim: true,
    },
});

const DayLog = model('DayLog', dayLogSchema);

module.exports = DayLog;