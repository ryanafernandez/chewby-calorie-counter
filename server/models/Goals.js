const { Schema, model } = require('mongoose');

const goalsSchema = new Schema({
    calorie_goal: {
        type: Number,
        trim: true,
        required: true,
        default: 2000
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
});

const Goals = model('Goals', goalsSchema);

module.exports = Goals;