const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/countryController');

const validate = [
  body('country').notEmpty(),
  body('capital').notEmpty(),
];

router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.post('/', validate, c.create);
router.put('/:id', validate, c.update);
router.delete('/:id', c.remove);

module.exports = router;
