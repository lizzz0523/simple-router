var Router = require('../index'),
    router = new Router();

router.get('/', function (req, res) {
    res.end('index');
});

router.use('/user', require('./user'));
router.use('/cgi', require('./cgi'));

var http = require('http');

http.createServer(router).listen(3000);