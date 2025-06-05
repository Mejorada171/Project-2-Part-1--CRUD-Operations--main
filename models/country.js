const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  country: { type: String, required: true },
  capital: { type: String, required: true },
  region: String,
  population: Number,
  president: String,
  currency: String,
  language: String,
  independent: Boolean
}, {collection: 'countries'});

module.exports = model('countries', countrySchema);
