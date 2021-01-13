const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    employee_id: {
        type: Number,
        required: true,
        unique: true
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company'
    },
    reporting_to: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
}, { timestamps: true });

userSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}


module.exports = mongoose.model('User', userSchema);