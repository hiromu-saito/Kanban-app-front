import * as types from '@/store/mutation-types'

const addTaskMock = addTask => {
  const injector = require('inject-loader!@/store/actions')
  const actionsMock = injector({
    '../api': {
      Tasks: {addTask}
    }
  })
  return actionsMock.default.addTask
}

describe('addTaskAction', () => {
  let commit
  let future
  describe('addTask APIが成功', () => {
    beforeEach(done => {
      const addTask = taskInfo => {
        return Promise.resolve({id: 1})
      }
      const action = addTaskMock(addTask)
      commit = sinon.spy()
      future = action({commit}, {listId: 1, name: 'task'})
      future.then(() => done())
    })
    it('commitが呼ばれていること', () => {
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.ADD_TASK)
      expect(commit.args[0][1].id).to.equal(1)
      expect(commit.args[0][1].name).to.equal('task')
      expect(commit.args[0][1].listId).to.equal(1)
    })
  })
  describe('addTask API が失敗', () => {
    beforeEach(done => {
      const addTask = taskInfo => {
        return Promise.reject(new Error('addTask API failed'))
      }
      const action = addTaskMock(addTask)
      commit = sinon.spy()
      future = action({commit}, {listId: 1, name: 'task'})
      future.catch(() => done())
    })
    it('commitが呼ばれず，エラーが帰ること', done => {
      expect(commit.called).to.equal(false)
      future.catch(err => {
        expect(err.message).to.equal('addTask API failed')
      }).then(done, done)
    })
  })
})
