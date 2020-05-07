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


const getFile = (file , cb ) => {

  var bucket = admin.storage().bucket("diploom-fa308.appspot.com");
    
  bucket.getFiles().then((data) => {
      const files = data[0];
      console.log(files.length);

      download(file, "../files/test.pdf", (res,hash) =>{
        console.log("res :",res)
        cb(res,hash)
      } );
   
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
       console.log("hash" ,sum) 

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
            cb(response.body, sum);
          });
          


      })
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};


const updateStudent = (txid , hash, fileURL) => {

  var db = admin.database();
  
  var ref = db.ref("/Students/");
  ref.orderByChild("diploma").equalTo(fileURL).on("child_added", function(snapshot) {
    console.log(snapshot.key);
    var refzer = db.ref("/Students/" + snapshot.key);
    refzer.update({
      "txid": txid,
      "hash": hash
    })
  });

}


const getFileCheck = (file , cb ) => {

  var bucket = admin.storage().bucket("diploom-fa308.appspot.com");
    
  bucket.getFiles().then((data) => {
      const files = data[0];
      console.log(files.length);

      downloadcheck(file, "../files/test.pdf", (res,hash) =>{
        console.log("res :",res)
        cb(res,hash)
      } );
   
  });


}

var downloadcheck = function(url, dest, cb) {

  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      sha256File("/Users/pixlzzz/Desktop/Cours/4A/ProjetAnnuel/diploom/files/test.pdf", function (error, sum) {
        if (error) return console.log(error);
       console.log("hash" ,sum) 

         /* var options = {
            'method': 'POST',
            'url': 'http://localhost:1984/checkBlockchain',
            'headers': {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"hexData":sum})
          
          };
          requestModule(options,  (error, response) => { 
            if (error) throw new Error(error);
            console.log(response.body);
            cb(response.body, sum);
          });
          */
         cb(sum)


      })
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};


var checkInBDD = function (fileUrl , hash , cb ){
  var db = admin.database();
  console.log("hash" , hash)
  var y =0;
  var ref = db.ref("/Students/");
  ref.orderByChild("hash").equalTo(hash).on("child_added", function(snapshot) {

    var refzer = db.ref("/Students/" + snapshot.key);
    var txid = refzer.child("txid");
    txid.once("value").then(res => {
      console.log("txid =" , res.val())
       y =1;
      cb(res.val(), hash);
    })
  });

  if(y == 0){
    cb(0 , 0);
  }
}





module.exports = {
  timestampAndStore,
  getFile,
  updateStudent,
  getFileCheck,
  checkInBDD,
}
