// add new function webCat that takes a URL
// using axios read the content of that URL and print it to the console
// modify cat from Step1.js so that based on the command-line args it decides whether the argument is a file path or URL and calls either cat or webCat
// if there is an error getting the page, print said error

// import axios from node_modules
const axios = require('axios');
const fs = require('fs')


function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    }
    console.log("DATA:", data);
  });
};

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1);
  }
}

const argument = process.argv[2];

if (argument) {
  if (argument.startsWith("http://") || argument.startsWith("https://")) {
    webCat(argument);
  } else {
    cat(argument);
  }
} else {
  console.error(
    "ERROR: Please provide a URL or file path as a command-line argument."
  );
  process.exit(1);
};