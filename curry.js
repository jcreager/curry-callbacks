var fs = require('fs')

// curried function
function curriedMultiply (x) {
  return function (y) {
    return x * y
  }
}

// max in anon function may be called with curriedMultiply
console.log(curriedMultiply(3)(3))

// curried version of the fs.readFile() funciton
function curriedReadFile (path, encoding) {
  var done
  var err
  var result
  var callback = function (e, r) {
    done = true
    err = e
    result = r
  }
  fs.readFile(path, encoding, function (e, r) {
    callback(e, r)
  })
  return function (_) {
    if (done) {
      _(err, result)
    } else {
      callback = _
    }
  }
}

var reader = curriedReadFile('hello.txt', 'utf8')

reader(function (err, data) {
  // Logs file contents to console
  console.log(data.toString())
})
