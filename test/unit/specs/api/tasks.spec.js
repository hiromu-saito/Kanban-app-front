import axios from 'axios'

const mockTasks = adapter => {
  const injector = require('inject-loader!@/api/tasks')
  const cilentMock = injector({
    './client': axios.create({adapter})
  })
  return cilentMock.default
}
describe('TasksAPIモジュール', () => {
  describe('removeTask', () => {
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
        tasksMock.removeTask({listId: 1, id: 1})
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done)
      })
    })
  })
  describe('addTask', () => {
    describe('成功', () => {
      it('タスクIDが帰ってくること', (done) => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({data: { id: 1 }, status: 200})
          })
        }
        const tasksMock = mockTasks(adapter)

        tasksMock.addTask({listId: 1, name: 'sample'})
          .then(res => {
            expect(res.id).to.equal(1)
            done()
          })
      })
    })
    describe('失敗', () => {
      it('エラーメッセージを取得できること', done => {
        const message = 'failed addTask'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = {data: {message}}
            reject(err)
          })
        }
        const tasksMock = mockTasks(adapter)
        tasksMock.addTask({listId: 1, name: 'sample'})
          .catch(err => {
            expect(err.message).to.equal('failed addTask')
            done()
          })
      })
    })
  })
})
