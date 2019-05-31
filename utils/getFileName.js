let path = require('path');

function getFileName (fileName) {
  let suffixName = path.extname(fileName),
      suffixNameIndex = fileName.indexOf(suffixName);
  
  return suffixNameIndex === -1 ? fileName : fileName.slice(0, suffixNameIndex);
}

module.exports =  getFileName;