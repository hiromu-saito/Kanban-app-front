import { mount } from '@vue/test-utils'
import KbnLoginForm from '@/components/moleclues/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
  describe('propaty', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {onLogin: () => {}}
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('入力なし', () => {
            it('validation.email.requiredがfalseであること', () => {
              loginForm.setData({email: ''})
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })
          describe('入力あり', () => {
            it('validation.email.requiredがfalseであること', () => {
              loginForm.setData({email: 'example@domain.com'})
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
          describe('メールアドレスでない形式', () => {
            it('validation.email.formatがtrueであること', () => {
              loginForm.setData({email: '1234567890'})
              expect(loginForm.vm.validation.email.format).to.equal(false)
            })
          })
          describe('メールアドレスの形式', () => {
            it('validation.email.formatがfalseであること', () => {
              loginForm.setData({email: 'example@domain.com'})
              expect(loginForm.vm.validation.email.format).to.equal(true)
            })
          })
        })
      })
      describe('password', () => {
        describe('required', () => {
          describe('入力なし', () => {
            it('validation.password.requiredがfalseであること', () => {
              loginForm.setData({password: ''})
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })
          describe('入力あり', () => {
            it('validation.password.requiredがtrueであること', () => {
              loginForm.setData({password: 'password'})
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })
    })
    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {onLogin: () => {}}
        })
        loginForm.vm.$nextTick(done)
      })

      describe('バリエーション全OK', () => {
        it('validがtrueであること', () => {
          loginForm.setData({email: 'example@domain.com', password: 'password'})
          expect(loginForm.vm.valid).to.equal(true)
        })
      })
      describe('NG項目あり', () => {
        it('validがfalseであること', () => {
          loginForm.setData({email: '', password: ''})
          expect(loginForm.vm.valid).to.equal(false)
        })
      })
    })
    describe('disableLoginAction', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {onLogin: () => {}}
        })
        loginForm.vm.$nextTick(done)
      })
      describe('バリデーションNGあり', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({email: '', password: ''})
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
      describe('バリデーション全OK且つログイン処理中', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'example@domain.com',
            password: 'password',
            progress: true
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
      describe('バリデーション全OK且つログイン処理中出ない', () => {
        it('ログイン処理有効', () => {
          loginForm.setData({
            email: 'example@domain.com',
            password: 'password'
          })
          expect(loginForm.vm.disableLoginAction).to.equal(false)
        })
      })
    })
    describe('onLogin', () => {
      let loginForm
      let onLoginStub
      beforeEach(done => {
        onLoginStub = sinon.stub()
        loginForm = mount(KbnLoginForm, {
          propsData: {onLogin: onLoginStub}
        })
        loginForm.setData({
          email: 'example@domain.com',
          password: 'password'
        })
        loginForm.vm.$nextTick(done)
      })
      describe('resolve', () => {
        it('resolveされること', done => {
          onLoginStub.resolves()

          // クリックイベント
          loginForm.find('button').trigger('click')
          expect(onLoginStub.called).to.equal(false)
          expect(loginForm.vm.error).to.equal('')
          expect(loginForm.vm.disableLoginAction).to.equal(true)

          loginForm.vm.$nextTick(() => {
            expect(onLoginStub.called).to.equal(true)
            const authInfo = onLoginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('')
              expect(loginForm.vm.disableLoginAction).to.equal(false)
              done()
            })
          })
        })
      })
      describe('reject', () => {
        it('rejectされること', done => {
          onLoginStub.rejects(new Error('login Error'))

          // クリックイベント
          loginForm.find('button').trigger('click')
          expect(onLoginStub.called).to.equal(false)
          expect(loginForm.vm.error).to.equal('')
          expect(loginForm.vm.disableLoginAction).to.equal(true)

          loginForm.vm.$nextTick(() => {
            expect(onLoginStub.called).to.equal(true)
            const authInfo = onLoginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('login Error')
              expect(loginForm.vm.disableLoginAction).to.equal(false)
              done()
            })
          })
        })
      })
    })
  })
})
