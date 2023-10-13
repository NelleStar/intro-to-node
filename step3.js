// add a feature where on the command line you can optionally provide an argument to output to a file instead of printing to the console

const axios = require("axios");
const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    }
    console.log("DATA:", data);
  });
}

function catWrite(path, filename) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Couldn't read ${path}:`);
      console.error(err);
      process.exit(1);
    }
    fs.writeFile(filename, data, (err) => {
      if (err) {
        console.error(`Couldn't write ${filename}:`);
        console.error(err);
        process.exit(1);
      }
      console.log(`${path} contents written to ${filename}`);
    });
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

async function webCatWrite(url, filename) {
  try {
    let res = await axios.get(url);

    if (res.data) {
      fs.writeFile(filename, res.data, (err) => {
        if (err) {
          console.error(`Couldnt write ${filename} due to ${err}`);
          process.exit(1);
        }
        console.log(`${url} contents written to ${filename}`)
      });
    } else {
      console.error('ERROR: Not valid URL')
      process.exit(1)
    }
  } catch (err) {
    console.error(`ERROR: ${err}`)
    process.exit(1)
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
}
