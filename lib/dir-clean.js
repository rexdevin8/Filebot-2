module.exports = function (dest) {
    const { spawn } = require("child_process");

    const child = spawn(
      "rm " + "-r " + dest,
      { shell: true }
    );

    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
  
    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
  
    child.on("close", (code) => {
      //console.log(`child process exited with code ${code}`);
    });
    console.log("Dir Removed!!")
  };
  