var url = require('url'),
    http = require('http');

var extend = require('./utils').extend,
    noop = require('./utils').noop,

    Route = require('./route');

var proto = module.exports = Router;

function Router(options) {
    function router(req, res, next) {
        router.dispatch(req, res, next || noop);
    }

    router = extend(router, options || {});

    router.__proto__ = proto;
    router.stack = [];

    return router;
}

proto.dispatch = function (req, res, done) {
    var stack = this.stack,
        i = -1,

        orig;


    if (!stack.length) {
        return;
    }

    if (!req.path) {
        req.path = pathname(req.url);
    }

    if (!req.params) {
        req.params = {};
    }

    orig = {
        path: req.path,
        params: req.params
    };

    done = restore(done, req, 'path', 'params');

    try {
        next();
    } catch (err) {
        console.log(err);
        done(err);
    }

    function next() {
        var route = stack[++i];

        if (!route) {
            return done();
        }

        if (!route.match(req.method, req.path)) {
            return next();
        }

        req.path = req.path.slice(route.path.length);
        req.path = req.path === '' ? '/' : req.path;
        req.params = route.params;

        route.handle(req, res, next);

        req.path = orig.path;
        req.params = orig.params;
    }
};

proto.use = function (path, handler) {
    var stack = this.stack;

    if (typeof path === 'function') {
        handler = path;
        path = '/';
    }

    stack.push(new Route(null, path, handler, false));

    return this;
};

http.METHODS
.map(function (method) {
    return method.toLowerCase();
})
.forEach(function (mehtod) {
    proto[mehtod] = function (path) {
        var handlers = [].slice.call(arguments, 1),
            stack = this.stack;

        handlers.forEach(function (handler) {
            stack.push(new Route(mehtod, path, handler, true));
        });

        return this;
    };
});

function pathname(str) {
    return url.parse(str).pathname;
}

function restore(fn, obj) {
    var keys = [].slice.call(arguments, 2);
        vals = {};

    keys.forEach(function (key) {
        vals[key] = obj[key];
    });

    return function () {
        keys.forEach(function (key) {
            obj[key] = vals[key];
        });

        fn.apply(null, arguments);
    };
}