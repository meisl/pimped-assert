var ASSERT = require('assert');

var pa     = require('../lib/pimped-assert'),
    assert = pa.assert,
    refute = pa.refute;


ASSERT.equal(typeof pa, "object", 'pimped-assert exports an object');
ASSERT.equal(typeof assert, "function", 'pimped-assert.assert is a function');
ASSERT.equal(typeof refute, "function", 'pimped-assert.refute is a function');


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

