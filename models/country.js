const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  _id: String,
  country: { type: String, required: true },
  capital: { type: String, required: true },
  region: String,
  population: Number,
  president: String,
  currency: String,
  language: String,
  independent: Boolean
});

module.exports = model('Country', countrySchema);
