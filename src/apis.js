import axios from 'axios'
import {getResult} from './functions'

export const getTransactions = async (contractAddress) => {
  return axios
    .get(`https://api.covalenthq.com/v1/42/address/${contractAddress}/transactions_v2/?&key=${process.env.API_KEY_COVALENTHQ}`)
    .then(getResult)
    .catch(err => {console.log('api call error: ',err)})
}
