import client from './client'

export default {
  login: authInfo => {
    return new Promise((resolve, reject) => {
      client.post('/auth/login', authInfo)
        .then(res => resolve({token: res.data.token, userId: res.data.userId}))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  logout: authInfo => {
    return new Promise((resolve, reject) => {
      client.delete('/auth/logout', authInfo)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
