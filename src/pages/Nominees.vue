<template>
  <main>
    <div
      class="container d-flex flex-wrap justify-content-center align-items-center w3-animate-bottom"
    >
      <NomineeCard
        v-for="candidate in candidates"
        :key="candidate._id"
        :candidate="candidate"
        :nominees="true"
      />
    </div>

    <Spinner v-if="loading && candidates.length === 0" />
  </main>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import NomineeCard from '../components/NomineeCard'
import Spinner from '../components/Spinner'

export default {
  name: 'Nominees',
  components: {
    NomineeCard,
    Spinner,
  },
  setup() {
    const store = useStore()

    onMounted(() => store.dispatch('candidates/getCandidates'))

    const candidates = computed(() => store.state.candidates.candidatesData)
    const error = computed(() => store.state.candidates.error)
    const loading = computed(() => store.state.candidates.loading)

    return {
      candidates,
      error,
      loading,
    }
  },
}
</script>

