"use strict";

var assert = require('assert');
var util   = require('util');


var refute = Object.assign((value, message) => assert(!value, message), {
    equal:              assert.notEqual,
    strictEqual:        assert.notStrictEqual,
    deepEqual:          assert.notDeepEqual,
    deepStrictEqual:    assert.notDeepStrictEqual,
    throws:             assert.doesNotThrow,
});


// verb .typeof

assert.typeof = (o, typestr, msg) => {
    var actual = typeof o;
    if (actual === typestr) {
        assert(true);
    } else {
        msg = msg ? msg + ': e' : 'E';
        msg += 'xpected typeof to be "' + typestr + '" but got "' + actual + '"; the thing in question:\n'
            + util.inspect(o)
        ;
        assert.fail(actual, typestr, msg);
    }
};

refute.typeof = (o, typestr, msg) => {
    var actual = typeof o;
    if (actual !== typestr) {
        assert(true);
    } else {
        msg = msg ? msg + ': e' : 'E';
        msg += 'xpected typeof NOT to be "' + typestr + '" but got exactly that; the thing in question:\n'
            + util.inspect(o)
        ;
        assert.fail(actual, typestr, msg);
    }
};

// verb .same

assert.same = (actual, expected, msg) => {
    if (Object.is(actual, expected)) {
        assert(true);
    } else {
        msg = msg ? msg + ': e' : 'E';
        msg += 'xpected to be same (Object.is):'
            + "\n  " + util.inspect(actual)
            + "\n(^actual); expected:"
            + "\n  " + util.inspect(expected)
        ;
        assert.fail(actual, expected, msg);
    }
};

refute.same = (actual, expected, msg) => {
    if (!Object.is(actual, expected)) {
        assert(true);
    } else {
        msg = msg ? msg + ': e' : 'E';
        msg += 'xpected NOT to be the same (Object.is):'
            + "\n  " + util.inspect(actual)
            + "\n(^actual); expected:"
            + "\n  " + util.inspect(expected)
            + "\n- but it is indeed the very same thing.";
        assert.fail(actual, expected, msg);
    }
};


function forEachCombi(opts, f) {
    for (let k of Object.keys(opts).reverse()) {
        let g = cb => o => opts[k].forEach(v => { o[k] = v; cb(o); });
        f = g(f);
    }
    f({});
}


function spy(o, n) {
    let f,
        detach,
        out = function () {
            let t = process.hrtime(),
                args = Array.prototype.slice.call(arguments, 0),
                result,
                i = out.calls.length;
            out.calls.push({
                thisArg:    this,
                arguments:  arguments,
                time:       t,
            });
            result = f.apply(this, args);
            out.calls[i].result = result;
            return result;
        };
    if (util.isString(n)) {
        f = o[n];
        if (o.hasOwnProperty(n)) {
            detach = function () {
                console.log("detaching " + n + "...");
                o[n] = f;
            };
        } else {
            detach = function () {
                delete o[n];
            };
        }
        o[n] = out;
    } else {
        f = o;
        detach = function () {
        };
    }
    out.calls = [];
    out.func  = f;
    out.detach = detach;
    return out;
}


module.exports = {
    assert: assert,
    refute: refute,
    forEachCombi: forEachCombi,
};
