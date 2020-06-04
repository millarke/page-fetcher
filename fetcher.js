const input = process.argv.slice(2);
const request = require('request');
const website = input[0];
const localPath = input[1];
const fs = require('fs');

request(website, (error, response, body) => {
  if (error) {
    console.log('error: ', error);
  }
  
  // response.statusCode

  console.log(body);
  fetch(body);
});

const fetch = (body) => {
  fs.writeFile(localPath, body, (err) => {
    if (err) throw err;
    request(website, (error, response) => {
      if (error) {
        console.log('error: ', error);
      }
      const size = response.headers["content-length"];
      console.log(`Download and saved ${size} bytes to ${localPath}`);
    }
    );
  }
  );
};





// //Example input and output
// > node fetcher.js http://www.example.edu/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html