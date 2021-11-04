import axios from "axios";
const isDEV = process.env.NODE_ENV === 'development';
const baseURL = isDEV ? "http://127.0.0.1:5000/api" : "https://projecture-backend.herokuapp.com/api";

const client = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
})

export const get = (url) => {
  return client.get(url, {withCredentials: true})
}

export const post = (url, data) => {
  return client.post(url, data, {withCredentials: true})
}

