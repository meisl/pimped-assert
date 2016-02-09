var ASSERT = require('assert');

var pa     = require('../lib/pimped-assert'),
    assert = pa.assert,
    refute = pa.refute;


ASSERT.strictEqual(typeof pa, "object", 'pimped-assert exports an object');
ASSERT.strictEqual(typeof assert, "function", 'assert is a function');
ASSERT.strictEqual(typeof refute, "function", 'refute is a function');


// verbs from the orginal 'assert'

[   ['equal',           'notEqual'      ],
    ['strictEqual',     'notStrictEqual'],
    ['deepEqual',       'notDeepEqual'],
    ['deepStrictEqual', 'notDeepStrictEqual'],
    ['throws',          'doesNotThrow'],
].forEach(verbPair => {
    var verb = verbPair[0],
        neg  = verbPair[1];
    ASSERT.strictEqual(assert[verb], ASSERT[verb], "pimped-assert.assert re-exposes assert's ." + verb);
    ASSERT.strictEqual(refute[verb], ASSERT[neg],  "pimped-assert.refute re-exposes assert's ." + neg + " as refute." + verb);
});



// additional verbs:

assert.same(0, 0);
assert.same(NaN, NaN);
refute.same(+0, -0);

var o = {};
assert.same(o, o, "some message");
// should fail: refute.same(o, o);
// should fail: refute.same(o, o, "some message");

refute.same(o, {});
refute.same(o, {}, "some message");
// should fail: assert.same(o, {});
// should fail: assert.same(o, {}, "some message");

refute.same(0, -0);
refute.same(0, -0, "some message");
// should fail: assert.same(0, -0);
// should fail: assert.same(0, -0, "some message");

assert.same(0, 0);
assert.same(0, 0, "some message");
// should fail: refute.same(0, 0);
// should fail: refute.same(0, 0, "some message");

assert.same("foo", "foo");
assert.same("foo", "foo", "some message");
// should fail: refute.same("foo", "foo");
// should fail: refute.same("foo", "foo", "some message");

