var fs = require('fs')

function future (fn, args, i) {
  var done, err, result
  var cb = function (e, r) {
    done = true
    err = e
    result = r
  }
  args = Array.prototype.slice.call(args)
  args[i] = function (e, r) {
    cb(e, r)
  }
  fn.apply(this, args)
  return function (_) {
    if (done) {
      (err, result)
    } else {
      cb = _
    }
  }
}

function curriedReadFile (path, encoding) {
  return future(readFile, arguments, 2)
}

function readFile (path, encoding, callback) {
  if (!callback) {
    return future(readFile, arguments, 2)
  }
  fs.readFile(path, encoding, callback)
}

// somewhere:
var reader = readFile('hello.txt', 'utf8')

// elsewhere:
reader(function (err, data) {
  console.log(err ? ('err=' + err.stack) : ('data=' + data))
})

var curriedReader = curriedReadFile('hello.txt', 'utf8')

curriedReader(function (err, data) {
  console.log(err ? ('err=' + err.stack) : ('data=' + data))
})
