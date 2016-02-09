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


assert.same = (actual, expected, msg) => {
    if (Object.is(actual, expected)) {
        assert(true);
    } else {
        msg = msg ? msg + ': e' : 'E';
        msg += 'xpected to be same (Object.is):'
            + "\n  " + util.inspect(actual)
            + "\n(^actual); expected:"
            + "\n  " + util.inspect(expected)
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
