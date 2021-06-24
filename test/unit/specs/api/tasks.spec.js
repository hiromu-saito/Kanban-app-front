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
  describe('fetchList', () => {
    describe('成功', () => {
      it('タスクリストが帰ってくること', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({data: {lists: [
              {id: 1, name: 'TODO', items: [{id: 1, name: 'task', description: 'description'}]},
              {id: 2, name: 'PENDING', items: [{id: 1, name: 'task', description: 'description'}]}
            ]}})
          })
        }
        const tasksMock = mockTasks(adapter)
        tasksMock.fetchList()
          .then(res => {
            expect(res.lists.length).to.equal(2)
            expect(res.lists[0].name).to.equal('TODO')
            expect(res.lists[1].name).to.equal('PENDING')
          })
          .then(done, done)
      })
    })
    describe('失敗', () => {
      it('エラーメッセージを取得できること', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error('failed fetchList')
            err.response = {data: 'failed fetchList'}
            reject(err)
          })
        }
        const tasksMock = mockTasks(adapter)
        tasksMock.fetchList()
          .catch(err => {
            expect(err.message).to.equal('failed fetchList')
          })
          .then(done, done)
      })
    })
  })
  describe('updateTask', () => {
    const taskInfo = {
      id: 1,
      name: 'task',
      description: 'description',
      listId: 1
    }
    describe('APIが失敗', () => {
      it('エラーが返ってくること', done => {
        const message = 'failed updataTask'
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message)
            err.response = {data: message}
            reject(err)
          })
        }
        const tasksMock = mockTasks(adapter)
        tasksMock.updateTask(taskInfo)
          .catch(err => {
            expect(err.message).to.equal(message)
          })
          .then(done, done)
      })
    })
  })
})
