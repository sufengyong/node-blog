let express = require('express'),
    path = require('path'),
    fs = require('fs'),
    marked = require('marked'),
    swig = require('swig'),
    open = require('open');

module.exports = function (dir) {
    let app = express(),
        router = express.Router();

    app.use(express.static(__dirname + '/assets'));
    app.use(router);
    app.set('views','./view/');
    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);
    
    router.get('/blog/*', function (req, res, next) {
      let fileName = getFileName(req.params[0]),
          filePath = path.resolve('./source', fileName + '.md');

      fs.readFile(filePath, function (err, content) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.end(markDownToHtml(content.toString()));
      });
    });

    router.get('/', function (req, res, next) {
      fs.readdir('./source', function (err, data) {
        if (err) {
          console.error(err);
          return next(err);
        }

        let directory = data.map((item) => {
          let result = item.match(/\d{8}/);
          if (result) {
            return {
              date: result[0],
              title: item.replace(result[0], '').replace(path.extname(item), ''),
              link: `/blog/${item.replace(path.extname(item), '.html')}`
            }
          } else {
            return {
              date: 'error',
              title: 'tip: 出错文件'
            }
          }
        });

        res.render('index', {directory});
     });
    });

    app.listen(3000);
    console.log('listener in http://127.0.0.1:3000');
    open('http://127.0.0.1:3000');
}

function getFileName (fileName) {
    let suffixName = path.extname(fileName),
        suffixNameIndex = fileName.indexOf(suffixName);
    
    return suffixNameIndex === -1 ? fileName : fileName.slice(0, suffixNameIndex);
}

function markDownToHtml (content) {
    return marked(content);
}