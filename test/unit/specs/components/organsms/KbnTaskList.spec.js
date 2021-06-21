import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnTaskList from '@/components/organsms/KbnTaskList'

// -> listHeader disableAddTaskForm
// -> taskCard task{id:,litId,name}
// -> taskForm listId
const localVue = createLocalVue()

localVue.use(Vuex)

describe('KbnTaskList', () => {
  describe('propaty', () => {
    describe('disabledAddTask', () => {
      let taskList
      beforeEach(done => {
        taskList = mount(KbnTaskList, {
          propsData: {
            list: {id: 1,
              name: 'TODO',
              items: [{
                id: 1, name: 'task1', description: 'description1'}]}}
        })
        taskList.vm.$nextTick(done)
      })
      it('+ボタン押下でフォーム表示とフォーム表示追加可否が切り変わること', done => {
        expect(taskList.vm.disabledAddTaskForm).to.equal(false)
        taskList.find({ name: 'KbnTaskListHeader' }).find('button').trigger('click')
        taskList.vm.$nextTick(() => {
          expect(taskList.vm.disabledAddTaskForm).to.equal(true)
          done()
        })
      })
      it('フォームのキャンセルボタン押下で切り替わること', done => {
        taskList.setData({disabledAddTaskForm: true})
        taskList.find({name: 'KbnTaskForm'}).findAll('button').at(1).trigger('click')
        taskList.vm.$nextTick(() => {
          expect(taskList.vm.disabledAddTaskForm).to.equal(false)
          done()
        })
      })
    })
  })
  describe('event', () => {
    describe('addTaskアクション成功', () => {
      let taskList
      let actions
      let store
      beforeEach(done => {
        actions = {
          addTask: sinon.stub()
        }
        store = new Vuex.Store({
          state: {},
          actions
        })

        taskList = mount(KbnTaskList, {
          propsData: {
            disabledAddTaskForm: true,
            list: {id: 1,
              name: 'TODO',
              items: [{
                id: 1, name: 'task1', description: 'description1'}]}},
          store,
          localVue
        })
        taskList.vm.$nextTick(done)
      })
      it('意図通りの呼び出しが行われること', done => {
        const addTask = actions.addTask
        addTask.resolves()

        const taksForm = taskList.find({name: 'KbnTaskForm'})
        taksForm.setData({name: 'name'})
        taksForm.find('button').trigger('click')

        taskList.vm.$nextTick(() => {
          expect(taskList.vm.disabledAddTaskForm).to.equal(false)
          expect(addTask.args[0][1].listId).to.equal(1)
          expect(addTask.args[0][1].name).to.equal('name')
          done()
        })
      })
    })
  })
})
