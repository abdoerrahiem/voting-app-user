import { createWebHistory, createRouter } from 'vue-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Nominees from '../pages/Nominees'
import QuickCount from '../pages/QuickCount'
import Voting from '../pages/Voting'
import NomineeProfile from '../pages/NomineeProfile'
import NotFound from '../pages/NotFound'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/nominees', name: 'Nominees', component: Nominees },
    {
      path: '/nominees/:id',
      name: 'NomineeProfile',
      component: NomineeProfile,
    },
    { path: '/quick-count', name: 'QuickCount', component: QuickCount },
    { path: '/voting', name: 'Voting', component: Voting },
    { path: '/*', component: NotFound },
  ],
})

export default router
