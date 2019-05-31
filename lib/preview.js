let express = require('express'),
    path = require('path'),
    fs = require('fs'),
    marked = require('marked'),
    open = require('open'),
    getDirectory = require('../utils/getDirectory'),
    getFileName = require('../utils/getFileName');

module.exports = function (dir) {
  let app = express(),
  router = express.Router();
  
  app.use(express.static(__dirname + '/assets'));
  app.use(router);
  
  router.get('/blog/*', function (req, res, next) {
    let fileName = getFileName(req.params[0]),
        filePath = path.resolve('./source', fileName + '.md');

    fs.readFile(filePath, function (err, content) {
      if (err) {
          console.error(err);
          return next(err);
      }
      res.end(marked(content.toString()));
    });
  });

  router.get('/', function (req, res, next) {
    let html = getDirectory();
    res.end(html);
  });

  app.listen(3000);
  console.log('listen in http://127.0.0.1:3000');
  open('http://127.0.0.1:3000');
}
