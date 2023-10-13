// define a function cat
// one argument (path) and it should read the file and print out the contents
// write code to call the function and specify the path argument via the command line
    // if path is non-existant print error and halt script

// require fileSystem in order to read 
const fs = require('fs');


function cat(path) {
  
  // readFile takes 3 args - the file, the encoding, the callback function with 2 args
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    }
    console.log("DATA:", data);
  });
};

const filePath = process.argv[2];
if(filePath) {
  cat(filePath)
} else {
  console.log('ERROR: no such file exists')
  process.exit(1)
}


// =============================================================================
// random trial/error code


// const faker = require('faker');
// console.log(faker.name.findName())


// process.on('exit', function(code) {
//     console.log(`exiting with code: ${code}`)
// })

// for (let arg of process.argv) {
//     console.log(arg)
// }

// setInterval(function() {
//     console.log('HELLO!')
// }, 1000)

// setInterval(function() {
//     process.exit(2)
// }, 6000)