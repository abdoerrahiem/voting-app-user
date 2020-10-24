<template>
  <main class="container">
    <Spinner v-if="loading && candidates.length === 0" />
    <div v-if="candidates.length > 0">
      <span class="badge badge-primary d-block mx-auto text-white rounded-pill"
        >Quick Count</span
      >
      <div class="d-flex flex-wrap w3-animate-zoom mb-4">
        <div
          v-for="(candidate, index) in candidates"
          class="card text-center m-3 p-3"
          :key="candidate._id"
          style="width: 320px"
        >
          <span class="badge badge-dark badges">{{ index + 1 }}</span>
          <p>
            {{ candidate.nameOfChairman }} &
            {{ candidate.nameOfViceChairman }}
          </p>
          <h3 class="text-info">{{ candidate.totalSuara }} Suara</h3>
        </div>
      </div>
      <div class="mb-4">
        <span
          class="badge badge-primary d-block mx-auto text-white rounded-pill"
          >Grafik Bar</span
        >
        <BarChart :candidates="candidates" />
      </div>
      <div class="mb-4">
        <span
          class="badge badge-primary d-block mx-auto text-white rounded-pill"
          >Grafik Pie</span
        >
        <PieChart :candidates="candidates" />
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import Spinner from '../components/Spinner'

export default {
  name: 'QuickCount',
  components: {
    BarChart,
    PieChart,
    Spinner,
  },
  setup() {
    const { state, dispatch } = useStore()

    onMounted(() => dispatch('candidates/getCandidates'))

    const candidates = computed(() => state.candidates.candidatesData)
    const loading = computed(() => state.candidates.loading)

    return {
      candidates,
      loading,
    }
  },
}
</script>

<style scoped>
.badges {
  width: 20px;
  border-radius: 100%;
  position: absolute;
  top: 2px;
  left: 2px;
}
</style>
