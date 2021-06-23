// propatyはdisableaction+メソッド
import {mount} from '@vue/test-utils'
import KbnBoardNavigation from '@/components/moleclues/KbnBoardNavigation'

describe('KbnBoardNavigataion', () => {
  describe('propaty', () => {
    describe('logout', () => {
      let BoardNavigataion
      let logoutStub
      beforeEach(done => {
        logoutStub = sinon.stub()
        BoardNavigataion = mount(KbnBoardNavigation, {
          propsData: {
            logout: logoutStub
          }
        })
        BoardNavigataion.vm.$nextTick(done)
      })
      describe('resolve', () => {
        it('resoleveされること', done => {
          logoutStub.resolves()
          // クリック
          BoardNavigataion.find('button').trigger('click')
          expect(logoutStub.called).to.equal(false)

          BoardNavigataion.vm.$nextTick(() => {
            expect(logoutStub.called).to.equal(true)
            expect(BoardNavigataion.vm.progress).to.equal(true)
            BoardNavigataion.vm.$nextTick(() => {
              expect(BoardNavigataion.vm.progress).to.equal(false)
              done()
            })
          })
        })
      })
    })
  })
})
