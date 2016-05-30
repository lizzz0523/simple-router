### Simple-Rotuer

for any node http service

#### example

##### 1. normal usage
```
    var http = require('http');

    var Router = require('simple-router'),
        router = new Router();

    router.get('/', function (req, res) {
        res.end('hello world');
    });

    var http = require('http');

    http.createServer(router).listen(3000);

```

##### 2. advanced usage
```
    var http = require('http');

    var Router = require('simple-router'),
        main = new Router(),
        user = new Router();

    main.get('/', function (req, res) {
        // http://localhost:3000
        res.end('index page');
    });

    user.get('/', function (req, res) {
        // http://localhost:3000/user
        res.end('user page');
    });

    user.get('/edit', function (req, res) {
        // http://localhost:3000/user/edit
        res.end('user edit');
    });

    main.use('/user', user);

    http.createServer(router).listen(3000);