import axios from 'axios'

// AUTH APIモジュールで利用するHTTPクライアントをモック化
const mockAuth = adapter => {
  const injector = require('inject-loader!@/api/auth')
  const clientMock = injector({
    './client': axios.create({adapter})
  })
  return clientMock.default
}

describe('Auth API モジュール', () => {
  describe('login', () => {
    const token = '123456789abcdef'
    const userId = '1'
    const address = 'foo@domain.com'
    const password = 'password'

    describe('成功', () => {
      it('token, UserIdが取得できること', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({data: {token, userId}, status: 200})
          })
        }
        const auth = mockAuth(adapter)
        auth.login({address, password})
          .then(res => {
            expect(res.token).to.equal(token)
            expect(res.userId).to.equal(userId)
          })
          .then(done)
      })
    })
    describe('失敗', done => {
      it('エラーメッセージを取得できること', () => {
        const message = 'failed login'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = {data: {message}, status: 401}
            reject(err)
          })
        }

        const auth = mockAuth(adapter)
        auth.login({address, password})
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
})
