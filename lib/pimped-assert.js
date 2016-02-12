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


module.exports = {
    assert: assert,
    refute: refute,
};
