import * as types from '@/store/mutation-types'

const makeFetchListAction = fetchList => {
  const injector = require('inject-loader!@/store/actions')
  const actionsMock = injector({
    '../api': {
      Tasks: {fetchList}
    }
  })
  return actionsMock.default.fetchList
}

describe('fetchList Action', () => {
  let actions
  let commit
  describe('fetchListAPIが成功', () => {
    it('commitが呼ばれていること', done => {
      const fetchList = () => {
        return Promise.resolve({
          lists: [
            {id: 1, name: 'TODO', items: [{id: 1, name: 'task', description: 'description'}]},
            {id: 2, name: 'PENDING', items: [{id: 1, name: 'task', description: 'description'}]}
          ]})
      }
      actions = makeFetchListAction(fetchList)
      commit = sinon.spy()
      actions({commit}).then(() => {
        expect(commit.called).to.equal(true)
        expect(commit.args[0][0]).to.equal(types.FETCH_ALL_TASKLIST)
        expect(commit.args[0][1].length).to.equal(2)
      }).then(done, done)
    })
  })
  describe('fetchListAPIが失敗', () => {
    it('エラーを取得できること', done => {
      const fetchList = () => {
        return Promise.reject(new Error('failed fetchList'))
      }
      actions = makeFetchListAction(fetchList)
      commit = sinon.spy()
      actions({commit}).catch(err => {
        expect(commit.called).to.equal(false)
        expect(err.message).to.equal('failed fetchList')
      })
        .then(done, done)
    })
  })
})
