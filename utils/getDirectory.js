let fs = require('fs'),
    path = require('path'),
    swig = require('swig'),
    getFileName = require('../utils/getFileName');

swig.setDefaults({cache: false});

function getDirectory () {
  try {
    let tpl = swig.compileFile(path.resolve('./view', 'index.html')),
        data = fs.readdirSync('./source'),
        directory = data.map((item) => {
          let result = item.match(/\d{8}/);
          if (result) {
            return {
              date: result[0],
              title: getFileName(item).replace(result[0], ''),
              link: `/blog/${getFileName(item)}.html`
            }
          } else {
            return {
              date: 'error',
              title: 'tip: 出错文件'
            }
          }
        });
    
    return tpl({directory});
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports =  getDirectory;
