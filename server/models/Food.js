const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
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
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Food = model('Food', foodSchema);

module.exports = Food;