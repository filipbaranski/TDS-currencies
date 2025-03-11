import axios from 'axios'

const url = import.meta.env.VITE_CB_URL
const apiKey = import.meta.env.VITE_CB_API_KEY

export const client = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${apiKey}`

  return config
})
