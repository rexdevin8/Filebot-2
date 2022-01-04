module.exports = function () {
const fs = require('fs');
const os = require('os');
const path = require('path');
let tmpDir;
const appPrefix = 'rar-bot';
try {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), appPrefix));
}
catch {
}
finally {
  try {
    if (tmpDir) {
      //fs.rmSync(tmpDir, { recursive: true });
    }
  }
  catch (e) {
    console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
  }
}
console.log(tmpDir)
return tmpDir
}
