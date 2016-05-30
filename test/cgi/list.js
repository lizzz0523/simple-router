var Router = require('../../index'),
    router = new Router();

router.get('/', function (req, res) {
    res.end('app get');
});

module.exports = router;