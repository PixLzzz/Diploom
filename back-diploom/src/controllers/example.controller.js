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
  var state = false;
  exampleService.getFileCheck(file, (resultFileCheck) => {
    if (resultFileCheck) {
      exampleService.checkInBDD(file, resultFileCheck, (txid, hash) => {
        if (txid == 0) {
        } else {
          bitcoinService.checkInBC(txid, hash, (resCheckInBC) => {
            console.log("btc : ", resCheckInBC);
            if (resCheckInBC == hash) {
              state = true;
            }
            console.log(txid);
            res.send(txid);
          });
        }
      });
    }
  });
};
module.exports = {
  thisFunctionControlSomething,
  hashFile,
  checkDiploma,
};
