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
    const {id, listId, name, description} = payload
    let list
    state.board.lists.forEach(l => {
      if (l.id === listId) { list = l }
    })
    list.items.forEach(i => {
      if (i.id === id) {
        i.name = name
        i.description = description
      }
    })
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
  },
  [types.MOVE_TO_TASK] (state, payload) {
    state.dragging.to = payload.listId
    state.dragging.target = payload.id
  },
  [types.MOVE_FROM_TASK] (state, payload) {
    state.dragging.from = payload.listId
    state.dragging.target = payload.id
  },
  [types.EXECUTION_MOVE_TASK] (state, payload) {
    const { target, from, to } = payload
    const getTaskList = (lists, id) => lists.find(list => list.id === id)

    // ドラッグ&ドロップ処理のための状態をリセット
    state.dragging.target = null
    state.dragging.from = null
    state.dragging.to = null

    // 移動元のタスクリストから対象タスクを取り出す
    const fromTaskList = getTaskList(state.board.lists, from)
    const index = fromTaskList.items.findIndex(item => item.id === target)
    const task = fromTaskList.items[index]
    fromTaskList.items.splice(index, 1)

    // 移動先のタスクリストIDに変更
    task.listId = to

    // 移動先にタスクリストに対象タスクを格納
    const toTaskList = getTaskList(state.board.lists, to)
    toTaskList.items.push(task)
  }
}
