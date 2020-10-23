<template>
  <main class="container">
    <Spinner v-if="loading && candidates.length === 0" />
    <div v-if="candidates.length > 0">
      <div class="d-flex flex-wrap">
        <div
          v-for="(candidate, index) in candidates"
          class="card text-center m-3 p-3"
          :key="candidate._id"
          style="width: 320px"
        >
          <span class="badge badge-dark">{{ index + 1 }}</span>
          <p>
            {{ candidate.nameOfChairman }} &
            {{ candidate.nameOfViceChairman }}
          </p>
          <h3 class="text-info">{{ candidate.totalSuara }} Suara</h3>
        </div>
      </div>
      <div class="mb-4">
        <BarChart :candidates="candidates" />
      </div>
      <div>
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
.badge {
  width: 20px;
  border-radius: 100%;
  position: absolute;
  top: 2px;
  left: 2px;
}

/* .quickCount {
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
} */
</style>
