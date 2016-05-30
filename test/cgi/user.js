var Router = require('../../index'),
    router = new Router();

router.get('/', function (req, res) {
    res.end('user get');
});

router.post('/create', function (req, res) {
    res.end('uesr create');
});

router.post('/update', function (req, res) {
    res.end('user update');
});

module.exports = router;