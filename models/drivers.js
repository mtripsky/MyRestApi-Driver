const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation DriverSchema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

// create driver Schema & model
const DriverSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  car: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
