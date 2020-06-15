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


const checkInBCx = async (txid , hash) =>{
  console.log(txid, hash , "yeyo" )
  try{
    return await bitcoinProvider.getTransaction(txid)
  } catch (error){
    console.log(error)
  } 
}

const checkInBC = async (txid, hash,cb) => {
  let result = null;
  try {
    const Tx = await bitcoinProvider.getTransaction(txid, false, true);
    const vouts = Tx.decoded.vout;
    Object.keys(vouts).forEach((key) => {
      if (vouts[key].scriptPubKey.type === 'nulldata') {
        const asm = vouts[key].scriptPubKey.asm.split(' ');
        const OP_RETURN = asm[1];
        result = OP_RETURN;
      }
    });
  } catch (error) {
    console.error('getOpReturn :', error.message);
  }
  console.log(result);
  cb(result);
};


module.exports = {
  writeOnBitcoin,
  checkInBC
}
