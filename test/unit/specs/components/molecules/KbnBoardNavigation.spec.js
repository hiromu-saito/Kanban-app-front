// propatyはdisableaction+メソッド
import {mount} from '@vue/test-utils'
import KbnBoardNavigation from '@/components/moleclues/KbnBoardNavication'

describe('KbnBoardNavigataion', () => {
  describe('propaty', () => {
    describe('logOff', () => {
      let BoardNavigataion
      let logOffStub
      beforeEach(done => {
        logOffStub = sinon.stub()
        BoardNavigataion = mount(KbnBoardNavigation, {
          propsData: {
            logOff: logOffStub
          }
        })
        BoardNavigataion.vm.$nextTick(done)
      })
      describe('resolve', () => {
        it('resoleveされること', done => {
          logOffStub.resolves()
          // クリック
          BoardNavigataion.find('button').trigger('click')
          expect(logOffStub.called).to.equal(false)

          BoardNavigataion.vm.$nextTick(() => {
            expect(logOffStub.called).to.equal(true)
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
