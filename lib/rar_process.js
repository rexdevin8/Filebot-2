module.exports = function (url) {
var url_parser = require("./url_parser");
var tmp = require("./tmp_dir");
var aria2 = require('./aria2')
var rar = require('./rar_splitter')
var file_list = require("./file_list")
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

