import mongoose from 'mongoose';

// MongoDB schemas for requests in localhost5000/exercises

const exerciseSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var schema = mongoose.model('exerciseSchema', exerciseSchema);

export default schema;
