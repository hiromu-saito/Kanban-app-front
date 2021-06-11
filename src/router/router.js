import KbnBoardView from '@/components/templates/KbnBoardView'
import KbnLoginView from '@/components/templates/KbnLoginView'
import KbnTaskDetailMordal from '@/components/templates/KbnTaskDetailMordal'

export default [
  {
    path: '/',
    component: KbnBoardView,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    component: KbnLoginView
  },
  {
    path: '/task/:id',
    component: KbnTaskDetailMordal,
    meta: {requiresAuth: true}
  },
  {
    path: '*',
    redirect: '/'
  }
]
