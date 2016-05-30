var pathToRegExp = require('path-to-regexp');

module.exports = Route;

function Route(method, path, handler, end) {
    this.handler = handler;
    this.method = getMethod(method);

    this.keys = [];
    this.regexp = pathToRegExp(path, this.keys, {
        end: end
    });

    this.path = '';
    this.params = {};
}

Route.prototype.match = function (method, path, base) {
    var match;

    if (this.method && this.method !== method) {
        return false;
    }

    if (this.regexp.test(path) !== true) {
        return false;
    }

    this.path = extractPath(this.regexp, path);
    this.params = extractParams(this.keys, this.regexp, path);

    return true;
};

Route.prototype.handle = function (req, res, next) {
    this.handler(req, res, next);
};

function getMethod(method) {
    return method && method.toUpperCase();
}

function extractPath(regexp, path) {
    var path = regexp.exec(path)[0];

    return path;
}

function extractParams(keys, regexp, path) {
    var values = regexp.exec(path).slice(1),
        key;

    return values.reduce(function(params, value, index) {
        key = keys[index].name;
        value = value ? decodeURIComponent(value) : null;

        params[key] = value;

        return params;
    }, {});
}