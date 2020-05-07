const bitcoinProvider = require('../providers/bitcoin.provider')

/**
 * @info This function write an hexadecimal data in bitcoin.
 * @param {String} hexData
 * @returns {String} represents bitcoin txid.
 */
const writeOnBitcoin = async (hexData) => {
  const amount = 0.00001
  try {
    const address = await bitcoinProvider.getNewAddress()
    const rawTx = await bitcoinProvider.createRawTransaction(address, amount, hexData)
    const fundedTx = await bitcoinProvider.fundRawTransaction(rawTx)
    const signedTx = await bitcoinProvider.signRawTransactionWithWallet(fundedTx.hex)
    return await bitcoinProvider.sendRawTransaction(signedTx.hex)
  } catch (error) {
    console.error(error.message)
  }
}


const checkInBC = async (txid , hash) =>{
  console.log(txid, hash , "yeyo" )
  try{
    return await bitcoinProvider.getTransaction(txid)
  } catch (error){
    console.log(error)
  } 
}



module.exports = {
  writeOnBitcoin,
  checkInBC
}
