module.exports = function (dest,url) {
    console.log(url);
    const { execSync } = require("child_process");

    const child = execSync("aria2c " + "-d " + dest + " " + url, {stdio: 'inherit'})
    console.log("Done !!")
    return dest
  };
  