import { mount } from '@vue/test-utils'
import KbnTaskListHeader from '@/components/moleclues/KbnTaskListHeader'

describe('KbnTaskListHeader', () => {
  describe('slot', () => {
    describe('挿入あり', () => {
      it('挿入されていること', () => {
        const listHeader = mount(KbnTaskListHeader, {
          slots: {default: 'slot'},
          propsData: {
            addTaskForm: () => {}
          }
        })
        expect(listHeader.find('span').text()).to.equal('slot')
      })
    })
    describe('挿入なし', () => {
      it('挿入されていないこと', () => {
        const listHeader = mount(KbnTaskListHeader, {
          propsData: {addTaskForm: () => {}}
        })
        expect(listHeader.find('span').text()).to.equal('')
      })
    })
  })
  describe('イベント', () => {
    describe('タスクフォームの追加不可', () => {
      it('イベントが発火されないこと', () => {
        const listHeader = mount(KbnTaskListHeader, {
          propsData: {disableAddTaskForm: true}
        })
        listHeader.find('button').trigger('click')
        expect(listHeader.emitted().click).to.equal(undefined)
      })
    })
  })
})
