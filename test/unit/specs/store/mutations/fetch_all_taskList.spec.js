import mutation from '@/store/mutations'

describe('fetchList', () => {
  it('stateに追加されること', () => {
    const state = {}
    mutation.FETCH_ALL_TASKLIST(state,
      [
        {id: 1, name: 'TODO', items: [{id: 1, name: 'task', description: 'description'}]},
        {id: 2, name: 'PENDING', items: [{id: 1, name: 'task', description: 'description'}]}
      ])
    expect(state.board.lists.length).to.equal(2)
    expect(state.board.lists[0].name).to.equal('TODO')
  })
})
