import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },
  [types.FETCH_ALL_TASKLIST] (state, payload) {
    state.board = {lists: payload}
  },
  [types.ADD_TASK] (state, payload) {
    const {id, listId, name} = payload
    let list
    state.board.lists.forEach(l => {
      if (l.id === listId) { list = l }
    })
    list.items.push({id, name})
  },
  [types.UPDATE_TASK] (state, payload) {
    // TODO;
    throw new Error('UPDATE_TASKmutation should be implemented')
  },
  [types.REMOVE_TASK] (state, payload) {
    const {id, listId} = payload
    for (let i = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      if (list.id !== listId) { continue }
      list.items = list.items.filter(item => item.id !== id)
    }
  },
  [types.AUTH_LOGOUT] (state) {
    state.auth.userId = null
    state.auth.token = null
  }
}
