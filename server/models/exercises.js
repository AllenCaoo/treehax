import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default exerciseSchema;
