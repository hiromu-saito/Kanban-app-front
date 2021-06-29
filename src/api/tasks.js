import client from './client'

export default {
  removeTask: taskInfo => {
    return new Promise((resolve, reject) => {
      client.delete('/tasks/:' + taskInfo.id + '/remove', taskInfo)
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
  },
  fetchList: () => {
    return new Promise((resolve, reject) => {
      client.get('/lists')
        .then(res => {
          resolve({lists: res.data.lists})
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  updateTask: (taskInfo) => {
    return new Promise((resolve, reject) => {
      client.put('/tasks/' + taskInfo.id + '/update', taskInfo)
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },
  executionMoveTask: ({id, from, to}) => {
    return new Promise((resolve, reject) => {
      client.post('/tasks/' + id + '/move', {from, to})
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
