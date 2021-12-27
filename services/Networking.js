
require('dotenv').config()
import axios from 'axios'
const baseUrl =  process.env.DB_URL



const getList = () => {
  console.log("NETWORKING-getlist")
  const request = axios.get(`${baseUrl}/list`)
  //console.log("request ", request)
  return request.then(response => response.data)
}

const addNewProduct = (productName, productUniqueId) => {
  console.log("NETWORKING-addnew", productName, productUniqueId)
  const request = axios.post(`${baseUrl}/newProduct`, {
    name: productName,
    uniqueId: productUniqueId
  })
  return request.then(response => response.data)
}

const removeProduct = (uniqueId) => {
  console.log("NETWORKING-delete", uniqueId)
  const request = axios.post(`${baseUrl}/removeProduct`, {
    uniqueId: uniqueId
  })
  return request.then(response => response.data)
}


const exportedObject = {
  getList, addNewProduct, removeProduct
}

export default exportedObject