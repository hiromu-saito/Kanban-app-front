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
        return Promise.resolve()
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
  moveToTask: ({commit}, {listId, id}) => {
    commit(types.MOVE_TO_TASK, {listId, id})
    return Promise.resolve()
  },
  moveFromTask: ({commit}, {listId, id}) => {
    commit(types.MOVE_FROM_TASK, {listId, id})
    return Promise.resolve()
  },
  executionMoveTask: ({commit, state}) => {
    const {target, from, to} = state.dragging
    return Tasks.executionMoveTask({id: target, from, to})
      .then(() => {
        commit(types.EXECUTION_MOVE_TASK, {target, from, to})
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
