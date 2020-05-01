const exampleService = require('../services/example.service')
var sha256File = require('sha256-file');


const thisFunctionControlSomething = async (req, res) => {
  const idontknow = req.body.hexData
  try {
    await exampleService.timestampAndStore(idontknow)
      .then((response) => {
        res.status(201).json(response)
      })
  } catch (error) {
    console.error(error.message)
    res.status(500)
  }
}

const hashFile = (req , res , cb) =>{
  console.log("qq" ,req.body)
  const file = req.body.data
  exampleService.getFile(file, (res, hash) => {
    cb(res,hash);
    console.log("yaya",res , "hash" , hash);
    if(res){
      exampleService.updateStudent(res , hash, file);
    }
  })
}

module.exports = {
  thisFunctionControlSomething,
  hashFile
}
