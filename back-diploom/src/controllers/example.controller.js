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

const hashFile = async (req , res) =>{
  console.log(req.body)
  const file = req.body.data
  try{
    await exampleService.getFile(file)
      .then((response) => {
        console.log("eee" ,response)
        return response
      })
  }catch (error) {
    console.error(error.message)
    res.status(500)
  }
}

module.exports = {
  thisFunctionControlSomething,
  hashFile
}
