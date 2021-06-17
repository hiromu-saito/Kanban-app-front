import axios from 'axios'

const mockTasks = adapter => {
  const injector = require('inject-loader!@/api/tasks')
  const cilentMock = injector({
    './client': axios.create({adapter})
  })
  return cilentMock.default
}
describe('TasksAPIモジュール', () => {
  describe('失敗', () => {
    it('エラーメッセージを取得できること', done => {
      const message = 'failed removeTasks'
      const adapter = config => {
        return new Promise((resolve, reject) => {
          const err = new Error(message)
          err.response = {data: {message}, status: 401}
          reject(err)
        })
      }
      const tasksMock = mockTasks(adapter)
      tasksMock.removeTask({id: 1, taskName: 'task'})
        .catch(err => {
          expect(err.message).to.equal(message)
        })
        .then(done)
    })
  })
})
