function _each(obj, fn) {
    var keys,
        i,
        len;

    if (Array.isArray(obj)) {
        i = -1;
        len = obj.length;

        while (++i < len) {
            if (fn.call(obj[i], obj[i], i, obj) === false) break;
        }
    } else {
        keys = Object.keys(obj);
        i = -1;
        len = keys.length;

        while (++i < len) {
            if (fn.call(obj[keys[i]], obj[keys[i]], keys[i], obj) === false) break;
        }
    }

    return obj;
};

exports.extend = function (obj) {
    var args = [].slice.call(arguments, 1);

    _each(args, function (src) {
        _each(src, function (value, key) {
            obj[key] = value;
        });
    });

    return obj;
};

exports.noop = function () {

};