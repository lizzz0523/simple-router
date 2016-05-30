module.exports = Route;

function Route(method, path, handler, end) {
    this.handler = handler;
    this.method = getMethod(method);
    this.regexp = pathToRegExp(path, end);

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
    this.params = extractParams(this.regexp, path);

    return true;
};

Route.prototype.handle = function (req, res, next) {
    this.handler(req, res, next);
};

function getMethod(method) {
    return method && method.toUpperCase();
}

var optionalParam = /\((.*?)\)/g,
    namedParam = /(\(\?)?:\w+/g,
    splatParam = /\*\w+/g,
    escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

function pathToRegExp(path, end) {
    var regexp = path
        .replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, function(match, optional) {
            return optional ? match : '([^/?]+)';
        })
        .replace(splatParam, '([^?]*?)');

    return new RegExp('^' + regexp + (end ? '$' : ''));
}

function extractPath(regexp, path) {
    var path = regexp.exec(path)[0];

    return path;
}

function extractParams(regexp, path) {
    var params = regexp.exec(path).slice(1);

    return params.map(function(param, i) {
        return param ? decodeURIComponent(param) : null;
    });
}