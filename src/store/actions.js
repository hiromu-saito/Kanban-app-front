import * as types from './mutation-types'
import {Auth, Task} from '../api'

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({token, userId}) => {
        commit(types.AUTH_LOGIN, {token, userId})
      })
      .catch(err => { throw err })
  },
  fetchList: ({ commit }) => {
    throw new Error('fetchList action should be implement')
  },
  addTask: ({ commit }) => {
    // TODO
    throw new Error('addTask action should be implement')
  },
  updateTask: ({ commit }) => {
    // TODO
    throw new Error('updateTask action should be implement')
  },
  removeTask: ({ commit }, taskInfo) => {
    return Task.removeTask(taskInfo)
      .then(() => {
        commit(types.REMOVE_TASK, taskInfo)
      })
      .catch(err => { throw err })
  },
  logout: ({ commit }) => {
    // TODO
    throw new Error('logout action should be implement')
  }
}
