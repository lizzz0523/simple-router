var Router = require('../index'),
    router = new Router();

router.get('/:id', function (req, res) {
    res.end('user:' + JSON.stringify(req.params));
});

router.get('/edit/:id', function (req, res) {
    res.end('user edit:' + JSON.stringify(req.params));
});

module.exports = router;