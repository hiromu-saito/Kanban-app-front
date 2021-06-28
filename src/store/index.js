import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  auth: { // 状態`Auth`
    token: localStorage.getItem('token'), // `token`は locale storage から取得する
    userId: null // `userId`はnullで初期化
  },
  board: { // 状態`Board`
    lists: [] // 状態`TaskList`は空で初期化
  },
  dragging: { // ドラッグ&ドロップされるタスクを処理するための状態を格納する
    target: null, // ドラッグ&ドロップ対象のタスクID
    from: null, // ドラッグ元のタスクリストID
    to: null // ドロップ先のタスクリストID
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // TODO
  strict: process.env.NODE_ENV !== 'production'
})
