const router = require('express').Router();
const swaggerUI = reqire('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/', swaggerUI.server);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
