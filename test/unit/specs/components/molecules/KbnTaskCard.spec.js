import { mount } from '@vue/test-utils'
import KbnTaskCard from '@/components/moleclues/KbnTaskCard'

describe('KbnTaskCard', () => {
  describe('イベント', () => {
    it('受け取ったtaskIDをイベントでなげること', () => {
      const taskCard = mount(KbnTaskCard, {
        propsData: {
          task: {id: 1, name: 'sampleTask'}
        }
      })
      taskCard.find('button').trigger('click')
      expect(taskCard.emitted().click.length).to.equal(1)
      expect(taskCard.emitted().click[0][0]).to.equal(1)
    })
  })
})
