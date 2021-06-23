import mutations from '@/store/mutations'

describe('addTask mutation', () => {
  it('taskが追加されること', () => {
    const state = {}
    state.board = {lists: [
      {id: 1, name: 'name', items: []},
      {id: 2, name: 'name', items: []}
    ]}
    const taskInfo = {id: 1, listId: 1, name: 'add task'}
    mutations.ADD_TASK(state, taskInfo)
    expect(state.board.lists[0].items.length).to.equal(1)
    expect(state.board.lists[0].items[0].name).to.equal('add task')
  })
})
