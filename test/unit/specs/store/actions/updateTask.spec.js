import * as types from '@/store/mutation-types'

const makeMockUpdateTask = updateTask => {
  const injector = require('inject-loader!@/store/actions')
  const mockAction = injector({
    '../api': {
      Tasks: {updateTask}
    }
  })
  return mockAction.default.updateTask
}

describe('updateTask', () => {
  let commit
  const taskInfo = {listId: 1, id: 1, name: 'name', description: 'description'}
  describe('APIが成功', () => {
    it('commitが呼ばれること', done => {
      const updateTask = taskInfo => {
        return Promise.resolve()
      }
      commit = sinon.spy()
      const mockUpdateTask = makeMockUpdateTask(updateTask)
      mockUpdateTask({commit}, taskInfo)
        .then(() => {
          expect(commit.called).to.equal(true)
          expect(commit.args[0][0]).to.equal(types.UPDATE_TASK)
          expect(commit.args[0][1].name).to.equal('name')
          expect(commit.args[0][1].listId).to.equal(1)
          expect(commit.args[0][1].id).to.equal(1)
          expect(commit.args[0][1].description).to.equal('description')
        })
        .then(done, done)
    })
  })
  describe('APIが失敗', () => {
    it('エラーが投げられること', done => {
      const message = 'failed api'
      const updateTask = taskInfo => {
        return Promise.reject(new Error(message))
      }
      commit = sinon.spy()
      const mockUpdateTask = makeMockUpdateTask(updateTask)
      mockUpdateTask({commit}, taskInfo)
        .catch(err => {
          expect(err.message).to.equal(message)
          expect(commit.called).to.equal(false)
        })
        .then(done, done)
    })
  })
})
