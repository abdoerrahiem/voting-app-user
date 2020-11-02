import axios from 'axios'
import { api, config, setAuthToken } from '../../utils'

const users = {
  namespaced: true,

  state() {
    return {
      token: localStorage.getItem('token') || null,
      userData: null,
      isAuth: false,
      loading: false,
      success: null,
      error: null,
    }
  },

  actions: {
    getCurrentUser: async ({ commit }) => {
      commit('setLoading', true)

      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }

      try {
        const { data } = await axios.get(`${api}/users/me`)
        commit('getCurrentUser', data)
      } catch (error) {
        console.log(error.response.data)
      }

      commit('setLoading', false)
    },
    loginUser: async ({ commit }, enteredData) => {
      commit('setLoading', true)

      try {
        const { data } = await axios.post(
          `${api}/users/loginUser`,
          enteredData,
          config
        )
        localStorage.setItem('token', data.token)
        setAuthToken(data.token)
        commit('loginUser', data)
      } catch (error) {
        commit('setError', error.response.data)
      }

      commit('setLoading', false)
    },
    editUser: async ({ commit }, enteredData) => {
      commit('setLoading', true)

      try {
        const { data } = await axios.put(`${api}/users/me`, enteredData, config)
        localStorage.setItem('token', data.user.token)
        setAuthToken(data.user.token)
        commit('editUser', data)
      } catch (error) {
        commit('setError', error.response.data)
      }

      commit('setLoading', false)
    },
    editPhoto: async ({ commit }, photoData) => {
      commit('setLoading', true)

      try {
        const { data } = await axios.put(
          `${api}/users/me/photo`,
          photoData,
          config
        )
        commit('editPhoto', data)
      } catch (error) {
        commit('setError', error.response.data)
      }

      commit('setLoading', false)
    },
    logout: async ({ commit }) => commit('logout'),
  },

  mutations: {
    setLoading: (state, loading) => (state.loading = loading),
    setError: (state, error) => {
      state.error = error.message
      setTimeout(() => {
        state.error = null
      }, 5000)
    },
    loginUser: (state, userData) => {
      state.token = userData.token
      state.isAuth = true
    },
    editUser: (state, userData) => {
      state.token = userData.user.token
      state.isAuth = true
      state.success = userData.message

      setTimeout(() => {
        state.success = null
      }, 3000)
    },
    editPhoto: (state, userData) => {
      state.success = userData.message

      setTimeout(() => {
        state.success = null
      }, 3000)
    },
    getCurrentUser: (state, userData) => {
      state.userData = userData.data
      state.isAuth = true
    },
    logout: (state) => {
      localStorage.removeItem('token')
      state.userData = null
      state.isAuth = false
      state.loading = false
      state.success = null
      state.error = null
    },
  },
}

export default users
