var Router = require('../index'),
    router = new Router();

router.use('/list', require('./cgi/list'));
router.use('/user', require('./cgi/user'));

module.exports = router;