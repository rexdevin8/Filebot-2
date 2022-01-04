module.exports = function (url) {
var url_parser = require("./lib/url_parser");
var tmp = require("./lib/tmp_dir");
var aria2 = require('./lib/aria2')
var rar = require('./lib/rar_splitter')
var file_list = require("./lib/file_list")
var path = require("path");


// Get filenamefrom url

f_name = url_parser(url);
filename = f_name[0];
pure_filename = f_name[1];

// create temp dir

dest = tmp();

// DownloadFIle

aria2(dest, url);

// split into parts (RAR)

rar(dest, dest, filename, pure_filename);

//list rar parts in DIR

list = file_list(dest);

return [list,dest];
}

