<template>
  <main class="container">
    <div class="cards w3-animate-top">
      <!-- <CountDown @set-show-card="setShowCard" @set-hide-card="setHideCard" /> -->
      <NomineeCard
        v-for="candidate in candidates"
        :key="candidate._id"
        :candidate="candidate"
        :voting="true"
      />
    </div>

    <Spinner v-if="loading && candidates.length === 0" />
  </main>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import NomineeCard from '../components/NomineeCard'
import Spinner from '../components/Spinner'
// import CountDown from '../components/CountDown'

export default {
  name: 'Voting',
  components: {
    NomineeCard,
    Spinner,
    // CountDown,
  },
  setup() {
    const showCard = ref(false)
    const store = useStore()

    onMounted(() => store.dispatch('candidates/getCandidates'))

    const candidates = computed(() => store.state.candidates.candidatesData)

    const error = computed(() => store.state.candidates.error)

    const loading = computed(() => store.state.candidates.loading)

    const setShowCard = () => (showCard.value = true)
    const setHideCard = () => (showCard.value = false)

    return {
      candidates,
      error,
      loading,
      showCard,
      setShowCard,
      setHideCard,
    }
  },
}
</script>

<style></style>
