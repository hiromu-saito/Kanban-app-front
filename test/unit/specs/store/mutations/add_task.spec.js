import mutations from '@/store/mutations'

describe('addTask mutation', () => {
  it('taskが追加されること', () => {
    const state = {}
    state.lists = [
      {id: 1, name: 'name', items: []},
      {id: 2, name: 'name', items: []}
    ]
    const taskInfo = {id: 1, listId: 1, name: 'add task'}
    mutations.ADD_TASK(state, taskInfo)
    expect(state.lists[0].items.length).to.equal(1)
    expect(state.lists[0].items[0].name).to.equal('add task')
  })
})
