const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: true
    },
    headquarter: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'Private'
    },
    founded: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Company', companySchema);