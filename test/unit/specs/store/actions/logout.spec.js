import * as types from '@/store/mutation-types'

const makeMockLogoutAction = logout => {
  const actionsInjector = require('inject-loader!@/store/actions')
  const actionsMock = actionsInjector({
    '../api': {
      Auth: {logout}
    }
  })
  return actionsMock.default.logout
}

describe('logout action', () => {
  const authInfo = {token: 'token', userId: 1}
  let commit
  let mockLogoutAction
  describe('logoutが成功', () => {
    it('commitが意図通りに呼ばれていること', done => {
      const mockLogout = authInfo => {
        return new Promise((resolve, reject) => {
          resolve(authInfo)
        })
      }
      commit = sinon.spy()
      mockLogoutAction = makeMockLogoutAction(mockLogout)
      mockLogoutAction({commit}, authInfo).then(() => {
        expect(commit.called).to.equal(true)
        expect(commit.args[0][0]).to.equal(types.AUTH_LOGOUT)
      })
        .then(done, done)
    })
  })
  describe('logoutが失敗', () => {
    it('エラーが投げられること', done => {
      const message = 'failed logout'
      const mockLogout = authInfo => {
        return new Promise((resolve, reject) => {
          const err = new Error(message)
          err.response = {data: message}
          reject(err)
        })
      }
      commit = sinon.spy()
      mockLogoutAction = makeMockLogoutAction(mockLogout)
      mockLogoutAction({commit}, authInfo)
        .catch(err => {
          expect(commit.called).to.equal(false)
          expect(err.message).to.equal(message)
        })
        .then(done, done)
    })
  })
})
