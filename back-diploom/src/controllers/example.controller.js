const exampleService = require("../services/example.service");
const bitcoinService = require("../services/bitcoin.service");
var sha256File = require("sha256-file");

const thisFunctionControlSomething = async (req, res) => {
  const idontknow = req.body.hexData;
  try {
    await exampleService.timestampAndStore(idontknow).then((response) => {
      res.status(201).json(response);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500);
  }
};

const hashFile = (req, res, cb) => {
  console.log("qq", req.body);
  const file = req.body.data;
  exampleService.getFile(file, (res, hash) => {
    cb(res, hash);
    if (res) {
      exampleService.updateStudent(res, hash, file);
    }
  });
};

const checkDiploma = (req, res) => {
  const file = req.body.data;
  console.log('req', req);
  console.log('req.body', req.body);
  var state = false;
  exampleService.getFileCheck(file, (res) => {
    if (res) {
      exampleService.checkInBDD(file, res, (txid, hash) => {
        if (txid == 0) {
        } else {
          bitcoinService.checkInBC(txid, hash, (res) => {
            console.log("btc : ", res);
            if (res == hash) {
              state = true;
            }
            console.log(state);
          });
        }
      });
    }
  });
  res.send(state);
};
module.exports = {
  thisFunctionControlSomething,
  hashFile,
  checkDiploma,
};
