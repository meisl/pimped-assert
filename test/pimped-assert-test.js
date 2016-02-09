var ASSERT = require('assert');

var pa     = require('../lib/pimped-assert'),
    assert = pa.assert,
    refute = pa.refute;


ASSERT.strictEqual(typeof pa, "object", 'pimped-assert exports an object');
ASSERT.strictEqual(typeof assert, "function", 'assert is a function');
ASSERT.strictEqual(typeof refute, "function", 'refute is a function');


/******** re-exposed verbs from the orginal 'assert' *************************/

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



/******** additional verbs ***************************************************/

//******* verb .typeof
ASSERT.strictEqual(typeof assert.typeof, "function", 'assert.typeof is a function');
ASSERT.strictEqual(typeof refute.typeof, "function", 'refute.typeof is a function');

assert.typeof(assert.typeof, "function", "assert.typeof");
assert.typeof(refute.typeof, "function", "refute.typeof");

() => {
    const f = () => undefined;
    assert.typeof(f, "function", "assert.typeof(" + f.toString + ", 'function') should pass");
    ASSERT.throws(() => { refute.typeof(f, "function") }, /AssertionError/, "assert.typeof(" + f.toString + ", 'function' should fail");

    assert.typeof('',       "string",  "assert.typeof('',       'string') should pass");
    assert.typeof(0,        "number",  "assert.typeof(0,        'number') should pass");
    assert.typeof(NaN,      "number",  "assert.typeof(NaN,      'number') should pass");
    assert.typeof(Infinity, "number",  "assert.typeof(Infinity, 'number') should pass");
    assert.typeof(true,     "boolean", "assert.typeof(true,     'boolean') should pass");
    assert.typeof(false,    "boolean", "assert.typeof(false,    'boolean') should pass");
    // TODO: regex
    assert.typeof({ },      "object",  "assert.typeof({ },      'object') should pass");

    // TODO: refutes
}();

//******* verb .same

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

