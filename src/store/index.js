import { createStore } from 'vuex'
import candidates from './modules/candidates'
import users from './modules/users'
import votes from './modules/votes'

const store = createStore({
  modules: {
    candidates,
    users,
    votes,
  },
})

export default store
