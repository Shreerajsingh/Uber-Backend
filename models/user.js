const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String, 
        enum: ['passanger', 'driver']
    },
    location: {
        type: {
            type: String,
            enum: ['point'],
            default: 'point'
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePasswords = async function(password) {
    return bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', userSchema);

module.exports = User