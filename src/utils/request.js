import axios from 'axios'

let request = axios.create({
  baseURL: '/',
  timeout: 30000
})

export default request