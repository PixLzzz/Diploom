const exampleController = require('../controllers/example.controller')

module.exports = (server) => {
  server.route('/blockchainit').post(exampleController.thisFunctionControlSomething),
  server.route('/hashFile').post(exampleController.hashFile),
  server.route('/checkDiploma').post(exampleController.checkDiploma)
}
