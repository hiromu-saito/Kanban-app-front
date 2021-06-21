import * as types from './mutation-types'
import {Auth, Tasks} from '../api'

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({token, userId}) => {
        commit(types.AUTH_LOGIN, {token, userId})
      })
      .catch(err => { throw err })
  },
  fetchList: ({ commit }) => {
    return Tasks.fetchList()
      .then(({lists}) => {
        commit(types.FETCH_ALL_TASKLIST, lists)
      })
      .catch(err => { throw err })
  },
  addTask: ({ commit }, taskInfo) => {
    return Tasks.addTask(taskInfo)
      .then(({id}) => {
        taskInfo.id = id
        commit(types.ADD_TASK, taskInfo)
      })
      .catch(err => { throw err })
  },
  updateTask: ({ commit }) => {
    // TODO
    throw new Error('updateTask action should be implement')
  },
  removeTask: ({ commit }, taskInfo) => {
    return Tasks.removeTask(taskInfo)
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
