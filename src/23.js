let fs = require('fs');

fs.readFile('/path/to/yourfile.js', 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
});
