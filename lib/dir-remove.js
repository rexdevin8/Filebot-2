module.exports = function (dest) {
const fs = require('fs');

// directory path
const dir = dest;

// delete directory recursively
fs.rmdir(dir, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }

    console.log(`${dir} is deleted!`);
});
}