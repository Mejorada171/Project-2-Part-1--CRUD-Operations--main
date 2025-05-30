const Country = require('../models/country');
const { validationResult } = require('express-validator');

exports.getAll = async (_, res) => res.json(await Country.find());

exports.getOne = async (req, res) => {
  const item = await Country.findById(req.params.id);
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
swagger.tags = ['Countries']  
const item = await Country.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};
  
