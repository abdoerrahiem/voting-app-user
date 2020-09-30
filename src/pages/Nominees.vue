<template>
  <div class="nominees">
    <NomineeCard
      v-for="candidate in candidates"
      :key="candidate._id"
      :candidate="candidate"
      :nominees="true"
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

<style>
.nominees {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 80vh;
  margin-top: 2rem;
}

.nominees__card {
  background: #fff;
  padding: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
}

.nominees__card > div {
  display: flex;
}

.nominees__card img {
  width: 7rem;
  height: 7rem;
  border-radius: 100%;
}

.nominees__card p {
  text-align: center;
  font-weight: bold;
}

.nominees__card-chairman {
  flex: 1;
  padding: 1rem;
}

.nominees__card-vicechairman {
  flex: 1;
  padding: 1rem;
}

.nominees__card-link {
  margin-top: 1rem;
}

.nominees__card-link a {
  background-color: #4c6ef5;
  color: #fff;
  padding: 5px 1.5rem;
  display: block;
  margin: 0 auto;
  border-radius: 1rem;
  border: 1px solid #4c6ef5;
  cursor: pointer;
}

.nominees__card-link a:hover {
  color: #4c6ef5;
  background-color: #fff;
}
</style>
