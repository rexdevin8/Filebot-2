module.exports = function (dest) {
  var path = require("path"),
    fs = require("fs");

  filter = ".rar";
    startPath = dest;
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  var list = [];
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      //console.log('-- found: ',filename);
      list.push(filename);
    }
  }
  return list;
};

