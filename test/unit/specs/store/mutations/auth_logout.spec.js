import mutations from '@/store/mutations'

describe('AUTH_LOGOUT mutations', () => {
  it('auth 情報がリセットされること', () => {
    const state = {auth: {token: 'token', userId: 1}}
    mutations.AUTH_LOGOUT(state)
    expect(state.auth.token).to.equal(null)
    expect(state.auth.userId).to.equal(null)
  })
})
