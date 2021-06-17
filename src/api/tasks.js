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
  }
}
