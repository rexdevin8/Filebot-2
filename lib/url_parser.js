module.exports = function (p_url) {
  var url = require("url");
  var path = require("path");
  var parsed = new URL(
    p_url
  );
  filename = decodeURIComponent(path.basename(parsed.pathname))
  //console.log(filename);
  pure_filename = filename.split('.').slice(0, -1).join('.')
  //console.log(pure_filename)
  return [filename , pure_filename]
};
