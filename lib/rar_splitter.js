module.exports = function (src, dest, filename, pure_filename) {
  const { execSync } = require("child_process");
  const path = require("path");

  var filesize = "30M ";
  var destination = path.join(dest, pure_filename + ".rar");
  var source = path.join(dest, filename);
  console.log(destination);

  const child = execSync("rar a -v" + filesize + destination + " " + source, {stdio: 'inherit'});
  return [dest, source];
};
