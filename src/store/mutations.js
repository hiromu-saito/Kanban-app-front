import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },
  [types.FETCH_ALL_TASKLIST] (state, payload) {
    // TODO;
    throw new Error('FETCH_ALL_TASKLIST mutation should be implemented')
  },
  [types.ADD_TASK] (state, payload) {
    // TODO;
    throw new Error('.ADD_TASK mutation should be implemented')
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
  [types.AUTH_LOGOUT] (state, payload) {
  }
}
