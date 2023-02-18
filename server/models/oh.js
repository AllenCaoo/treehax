import mongoose from 'mongoose'; 

// MongoDB schemas for requests in localhost5000/oh

const OHSchema = mongoose.Schema({
    message: String
}, {
    timestamps: true
});

var schema = mongoose.model('OHSchema', OHSchema);

export default schema;
