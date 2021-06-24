import mutation from '@/store/mutations'

describe('UPDATE_TASK mutation', () => {
  it('stateが更新されていること', () => {
    const state = {}
    state.board = {lists: [
      {id: 1, name: 'name', items: [{id: 1, name: 'beforeName', description: 'beforeDescription'}]},
      {id: 2, name: 'name', items: []}
    ]}
    const taskInfo = {listId: 1, id: 1, name: 'afterName', description: 'afterDescription'}
    mutation.UPDATE_TASK(state, taskInfo)
    const {id, name, description} = state.board.lists[0].items[0]
    expect(id).to.equal(1)
    expect(name).to.equal('afterName')
    expect(description).to.equal('afterDescription')
  })
})
