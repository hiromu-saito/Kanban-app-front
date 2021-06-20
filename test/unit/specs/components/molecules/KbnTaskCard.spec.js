import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnTaskCard from '@/components/moleclues/KbnTaskCard'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('KbnTaskCard', () => {
  beforeEach(() => {
  })
  describe('removeTaskアクションが成功', () => {
    it('成功すること', () => {
      let actions = {
        removeTask: sinon.stub()
      }
      actions.removeTask.resolves()
      let store = new Vuex.Store({
        state: {},
        actions
      })
      const taskCard = mount(KbnTaskCard, {
        propsData: {task: {id: 1, listId: 1, name: 'sample'}},
        store,
        localVue
      })
      taskCard.find('button').trigger('click')
      expect(actions.removeTask.called).to.equal(true)
      expect(actions.removeTask.args[0][1].id).to.equal(1)
      expect(actions.removeTask.args[0][1].listId).to.equal(1)
    })
  })
  // describe('removeTaskアクションが失敗', () => {
  //   let taskCard
  //   it('エラーが帰ること', async () => {
  //     let actions = {
  //       removeTask: sinon.stub()
  //     }
  //     actions.removeTask.rejects(new Error('failed removeTask'))
  //     let store = new Vuex.Store({
  //       state: {},
  //       actions
  //     })
  //     taskCard = mount(KbnTaskCard, {
  //       propsData: {task: {id: 1, listId: 1, name: 'sample'}},
  //       store,
  //       Vuex
  //     })
  //     sinon.spy(taskCard.vm, 'throwReject')
      
  //     await taskCard.find('button').trigger('click')
  //     expect(actions.removeTask.called).to.equal(true)
  //     const callInfo = taskCard.vm.throwReject
  //     expect(callInfo.called).to.equal(true)
  //     expect(callInfo.args[0][0].message).to.equal('failed removeTask')
  //   })
  //   afterEach(() => {
  //     taskCard.vm.throwReject.restore()
  //   })
  // })
})
