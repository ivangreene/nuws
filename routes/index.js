const path = require('path');

module.exports = function(express) {
  let router = express.Router();
  router.use(require('./views')(express));
  router.use(require('./api')(express));
  router.use(express.static(path.join(__dirname, '../public')));
  return router;
}
