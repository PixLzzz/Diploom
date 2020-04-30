const mongodbProvider = require('../providers/mongodb.provider')
const bitcoinService = require('../services/bitcoin.service')
var sha256File = require('sha256-file');
const fs = require('fs');
var requestModule = require('request');
var firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccount = require("../files/diploom-fa308-firebase-adminsdk-8sp77-3266692c5b.json");
var https = require('https');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diploom-fa308.firebaseio.com"
});
var download = require('download-file')

var firebaseConfig = {
  apiKey: "AIzaSyB1cCi6l9eM2Tb55czVVgCn4ymNYDTs7zY",
  authDomain: "diploom-fa308.firebaseapp.com",
  databaseURL: "https://diploom-fa308.firebaseio.com",
  projectId: "diploom-fa308",
  storageBucket: "diploom-fa308.appspot.com",
  messagingSenderId: "262664278159",
  appId: "1:262664278159:web:e1ddb44187166d2460a0fa"
};

firebase.initializeApp(firebaseConfig);
/*
  * All business logic have to be here
  * For example here we have a service and DB access.
*/
const timestampAndStore = async (idontknow) => {
  try {
    const txSent = await bitcoinService.writeOnBitcoin(idontknow)
    return txSent
  } catch (error) {
    console.error(error.message)
  }
}


const getFile = async (file ) => {
  

  const fileUrl = JSON.stringify(file);
  const fileid = fileUrl.slice(73)
  console.log(fileid)


  var cb;
  var bucket = admin.storage().bucket("diploom-fa308.appspot.com");
    
  bucket.getFiles().then((data) => {
      const files = data[0];
      console.log(files.length);

      download(file, "../files/test.pdf", cb);
   
  });
}


var download = function(url, dest, cb) {
  var ret ;
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      sha256File("/Users/pixlzzz/Desktop/Cours/4A/ProjetAnnuel/diploom/files/test.pdf", function (error, sum) {
        if (error) return console.log(error);
       console.log(sum) // '345eec8796c03e90b9185e4ae3fc12c1e8ebafa540f7c7821fb5da7a54edc704'

          var options = {
            'method': 'POST',
            'url': 'http://localhost:1984/blockchainit',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"hexData":sum})
          
          };
          requestModule(options,  (error, response) => { 
            if (error) throw new Error(error);
            console.log(response.body);
            ret = response.body
          });
          


      })
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
  return ret;
};


//64247cf8ad38c756d2f49a30e656b62dfd687e59665dda8ffa3be11dc311153c

module.exports = {
  timestampAndStore,
  getFile
}
