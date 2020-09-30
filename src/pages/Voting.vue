<template>
  <div class="nominees">
    <NomineeCard
      v-for="candidate in candidates"
      :key="candidate._id"
      :candidate="candidate"
      :voting="true"
    />
    <Spinner v-show="loading && candidates.length === 0" />
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import NomineeCard from '../components/NomineeCard'
import Spinner from '../components/Spinner'

export default {
  name: 'Voting',
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

<style></style>
