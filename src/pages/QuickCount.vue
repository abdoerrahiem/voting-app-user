<template>
  <div class="quickCount">
    <Spinner v-show="loading && candidates.length === 0" />
    <div v-if="candidates.length > 0">
      <div>
        <h2>Quick Count:</h2>
        <p v-for="(candidate, index) in candidates" :key="candidate._id">
          {{ index + 1 }}) {{ candidate.nameOfChairman }} &
          {{ candidate.nameOfViceChairman }} : {{ candidate.totalSuara }} Suara
        </p>
      </div>
      <div>
        <BarChart :candidates="candidates" />
      </div>
      <div>
        <PieChart :candidates="candidates" />
      </div>
    </div>
  </div>
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

<style>
.quickCount {
  margin-top: 3.5rem;
}

.quickCount > div {
  padding: 2rem;
}

.quickCount .loader {
  margin: 0 auto;
  margin-top: 40vh;
}

.quickCount > div > div {
  margin-bottom: 2rem;
  flex: 1;
}

.quickCount h3 {
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  width: 20rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.quickCount h2 {
  margin-bottom: 1rem;
  color: rgb(80, 106, 255);
}

.quickCount p {
  margin-bottom: 0.5rem;
  color: rgb(80, 106, 255);
}
</style>
