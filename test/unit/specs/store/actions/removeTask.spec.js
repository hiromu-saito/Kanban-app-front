import * as types from '@/store/mutation-types'

// removeAction内の依存関係をモック化する
const mockRemoveTaskAction = removeTask => {
  const actionsInjector = require('inject-loader!@/store/actions')

  const actionsMocks = actionsInjector({
    '../api': {
      Task: { removeTask }
    }
  })
  return actionsMocks.default.removeTask
}

describe('removeTaskアクション', () => {
  let commit
  let future
  describe('Task.removeTaskが成功', () => {
    beforeEach(done => {
      const removeTask = taskInfo => Promise.resolve()

      const action = mockRemoveTaskAction(removeTask)
      commit = sinon.spy()
      future = action({commit}, {id: 1, listId: 1})
      future.then(() => done())
    })
    it('commitが呼ばれていること', () => {
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.REMOVE_TASK)
      expect(commit.args[0][1].id).to.equal(1)
      expect(commit.args[0][1].listId).to.equal(1)
    })
  })
  describe('Task.removeTaskが失敗', () => {
    beforeEach(done => {
      const removeTask = taskInfo => Promise.reject(new Error('failed removeTask'))
      const action = mockRemoveTaskAction(removeTask)

      commit = sinon.spy()
      future = action({commit})
      future.catch(() => done())
    })
    it('エラーが投げられること', done => {
      expect(commit.called).to.equal(false)
      future.catch(err => {
        expect(err.message).to.equal('failed removeTask')
        done()
      })
    })
  })
})
