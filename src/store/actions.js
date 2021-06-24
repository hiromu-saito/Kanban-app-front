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
  updateTask: ({ commit }, taskInfo) => {
    return Tasks.updateTask(taskInfo)
      .then(() => {
        commit(types.UPDATE_TASK, taskInfo)
      })
      .catch(err => { throw err })
  },
  removeTask: ({ commit }, taskInfo) => {
    return Tasks.removeTask(taskInfo)
      .then(() => {
        commit(types.REMOVE_TASK, taskInfo)
      })
      .catch(err => { throw err })
  },
  logout: ({ commit }, authInfo) => {
    return Auth.logout(authInfo)
      .then(() => {
        commit(types.AUTH_LOGOUT)
      })
      .catch(err => { throw err })
  }
}
