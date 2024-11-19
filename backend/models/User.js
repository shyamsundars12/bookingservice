const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { type: String },
  address: {
    houseNo: String,
    society: String,
    streetAddress: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String,
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('User', userSchema);
