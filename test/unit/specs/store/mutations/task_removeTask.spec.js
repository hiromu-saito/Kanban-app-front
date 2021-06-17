import mutations from '@/store/mutations'

describe('REMOVE_TASK mutation', () => {
  it('stateから削除されていること', () => {
    const state = {
      board: {
        lists: [
          {
            id: 1,
            name: 'TODO',
            items: [
              {id: 1, name: 'task1', description: 'description1'}
            ]
          }
        ]
      }
    }
    mutations.REMOVE_TASK(state, {id: 1, listId: 1})
    expect(state.board.lists[0].items.length).to.equal(0)
  })
})
