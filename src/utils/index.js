import axios from 'axios'

export const api = 'https://votingapp-api.herokuapp.com/api'

export const config = { headers: { 'Content-Type': 'application/json' } }

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export const axiosCreate = axios.create({
  baseURL: api,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const colors = [
  'red',
  'blue',
  'purple',
  'yellow',
  'green',
  'orange',
  'brown',
  'black',
]

export const choseColor = (number) => {
  let newColors = []
  for (let i = 0; i < number; i++) {
    newColors.push(colors[i])
  }
  return newColors
}
