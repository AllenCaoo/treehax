import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OHSchema = new Schema({
    message: String
}, {
    timestamps: true
});

export default OHSchema;
