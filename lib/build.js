let fs = require('fs'),
    rd = require('rd'),
    marked = require('marked'),
    getFileName = require('../utils/getFileName'),
    getDirectory = require('../utils/getDirectory');

module.exports = function (dir) {
  fs.writeFile('./build/index.html', getDirectory(), (err) => {
    if (err) {
      console.error(err);
    }
  });

  rd.eachFileFilter('./source', /\.md$/, (filepath, stats) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.error(err);
        return;
      };

      fs.writeFile(`./build/${getFileName(filepath.split('\\').pop())}.html`, marked(data.toString()), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
