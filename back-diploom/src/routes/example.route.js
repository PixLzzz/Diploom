const express = require('express')
var router = express.Router();
const exampleController = require('../controllers/example.controller')

router.post('/blockchainit', exampleController.thisFunctionControlSomething);
router.post('/hashFile', exampleController.hashFile);
router.post('/checkDiploma', exampleController.checkDiploma);

module.exports = router;
