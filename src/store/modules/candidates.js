import axios from 'axios'
import { api } from '../../utils'

const candidates = {
  namespaced: true,

  state() {
    return {
      candidatesData: [],
      candidateData: null,
      loading: false,
      error: null,
    }
  },

  actions: {
    getCandidates: async ({ commit }) => {
      commit('setLoading', true)

      try {
        const { data } = await axios.get(`${api}/candidates`)
        commit('setCandidates', data)
      } catch (error) {
        commit('setError', error.response.data)
      }

      commit('setLoading', false)
    },
    getCandidate: async ({ commit }, candidateId) => {
      commit('setLoading', true)

      try {
        const { data } = await axios.get(`${api}/candidates/${candidateId}`)
        commit('setCandidate', data)
      } catch (error) {
        commit('setError', error.response.data)
      }

      commit('setLoading', false)
    },
  },

  mutations: {
    setCandidates: (state, candidatesData) =>
      (state.candidatesData = candidatesData.data),
    setCandidate: (state, candidateData) =>
      (state.candidateData = candidateData.data),
    setLoading: (state, loading) => (state.loading = loading),
    setError: (state, error) => (state.error = error.message),
  },
}

export default candidates
