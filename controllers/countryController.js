const { default: mongoose } = require('mongoose');
const Country = require('../models/country');
const { validationResult } = require('express-validator');

// exports.getAll = async (_, res) => res.json(await Country.find());

exports.getAll = async (req, res) => { 
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getOne = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new Error('Invalid ID format');
  }

  const objectId = new mongoose.Types.ObjectId(req.params.id);
  console.log('Fetching country with ID:', req.params.id);
  const item = await Country.findOne({_id: req.params.id});
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const item = await Country.create(req.body);
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.remove = async (req, res) => {
const item = await Country.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
  
