import { mount } from '@vue/test-utils'
import KbnIcon from '@/components/atoms/KbnIcon.vue'

describe('KbnIcon', () => {
  describe('イベント', () => {
    it('イベントが発行されていること', () => {
      const icon = mount(KbnIcon)
      icon.trigger('click')
      expect(icon.emitted().click.length).to.equal(1)
    })
  })
  describe('slot', () => {
    describe('挿入あり', () => {
      it('挿入されていること', () => {
        const icon = mount(KbnIcon, {
          slots: {default: '挿入あり'}
        })
        expect(icon.text()).to.equal('挿入あり')
      })
    })
    describe('挿入なし', () => {
      it('挿入されていないこと', () => {
        const icon = mount(KbnIcon)
        expect(icon.text()).to.equal('')
      })
    })
  })
})
