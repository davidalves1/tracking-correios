import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.postmon.com.br/',
  withCredentials: false
})

export const getTracking = trackingCode => {
  return api.get(`v1/rastreio/ect/${trackingCode}`)
    .then(res => res.data)
}
