import { mount } from '@vue/test-utils'
import KbnTaskForm from '@/components/moleclues/KbnTaskForm'

describe('KbnTaskForm', () => {
  describe('disableAddTask', () => {
    let taskForm
    beforeEach(done => {
      taskForm = mount(KbnTaskForm, {
        propsData: {
          listId: 1
        }
      })
      taskForm.vm.$nextTick(done)
    })
    describe('入力なし', () => {
      it('追加ボタンが押せないこと', () => {
        taskForm.vm.$nextTick()
        expect(taskForm.vm.disableAddTask).to.equal(true)
      })
    })
    describe('入力あり', () => {
      it('追加ボタンが押せること', () => {
        taskForm.setData({name: 'task'})
        expect(taskForm.vm.disableAddTask).to.equal(false)
      })
    })
  })
})
