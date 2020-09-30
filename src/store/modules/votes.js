import axios from 'axios'
import { api } from '../../utils'

const votes = {
  namespaced: true,

  state() {
    return {
      loading: false,
      success: null,
      error: null,
    }
  },

  actions: {
    addVote: async ({ commit }, candidateId) => {
      commit('setLoading', true)

      try {
        const { data } = await axios.post(`${api}/votes/${candidateId}`)
        commit('addVote', data)
      } catch (error) {
        commit('setError', error.response.data)
      }

      commit('setLoading', false)
    },
  },

  mutations: {
    addVote: (state, voteData) => {
      state.success = voteData.message
      setTimeout(() => {
        state.success = null
      }, 5000)
    },
    setLoading: (state, loading) => (state.loading = loading),
    setError: (state, error) => {
      state.error = error.message
      setTimeout(() => {
        state.error = null
      }, 5000)
    },
  },
}

export default votes
