const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    altPhone: String,
    dob: String,
    gender: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    nationality: String,
    qualification: String,
    passingYear: String,
    percentage: String,
    program: String,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);