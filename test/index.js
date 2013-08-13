
var test = require('tape')
var _JSON = require('../')
var bops = require('bops')

function toJSON (o) {
  return JSON.parse(JSON.stringify(o))
}

var examples = {
  simple: { foo: [], bar: {}, baz: bops.from('some binary data') },
  just_buffer: bops.from('JUST A BUFFER'),
  all_types: {
    string:'hello',
    number: 3145,
    null: null,
    object: {},
    array: [],
    boolean: true,
    boolean2: false
  },
  foo: new Buffer('foo'),
  foo2: new Buffer('foo2'),
  escape: {
    buffer: bops.from('x'),
    string: _JSON.stringify(bops.from('x'))
  },
  escape2: {
    buffer: new Buffer('x'),
    string: ':base64:'+ bops.to(bops.from('x'), 'base64')
  },
  undefined: {
    empty: undefined
  },
  fn: {
    fn: function () {}    
  }
}

for(k in examples)
(function (value, k) { 
  test(k, function (t) {
    var s = _JSON.stringify(value)
    console.log(s)
    var _value = _JSON.parse(s)
    t.deepEqual(toJSON(_value), toJSON(value))
    t.end()
  })
})(examples[k], k)

