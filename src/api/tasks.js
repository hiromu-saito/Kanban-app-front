import client from './client'

export default {
  removeTask: taskInfo => {
    return new Promise((resolve, reject) => {
      client.post('/tasks/:' + taskInfo.id + '/remove', taskInfo)
        .then(() => { resolve() })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  addTask: taskInfo => {
    return new Promise((resolve, reject) => {
      client.post('/tasks/add', taskInfo)
        .then(res => {
          resolve({id: res.data.id})
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
