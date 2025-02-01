const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bookingSchema = new mongoose.Schema({
    passanger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    source: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    destination: {
        llatitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    fare: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending'
    },
    rating: {
        type: Number
    },
    feedback: {
        type: String
    }
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;