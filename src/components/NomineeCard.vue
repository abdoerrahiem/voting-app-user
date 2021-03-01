<template>
  <Modal
    v-show="showModal"
    @set-hide-modal="setHideModal"
    :candidateId="candidate._id"
  />
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div
          class="col d-flex flex-column justify-content-center align-items-center"
        >
          <img :src="candidate.photoOfChairman" alt="profile" />
          <p>{{ candidate.nameOfChairman }}</p>
          <p>(Ketua)</p>
        </div>
        <div
          class="col d-flex flex-column justify-content-center align-items-center"
        >
          <img :src="candidate.photoOfViceChairman" alt="profile" />
          <p>{{ candidate.nameOfViceChairman }}</p>
          <p>(Wakil Ketua)</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-link
            class="btn btn-block btn-primary rounded-pill"
            v-if="nominees"
            :to="{
              name: 'NomineeProfile',
              params: { id: candidate._id },
            }"
            >Lihat Selengkapnya &#8594;</router-link
          >
          <button
            class="btn btn-block btn-success rounded-pill"
            v-if="voting"
            @click="setShowModal"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Modal from './Modal'

export default {
  name: 'NomineeCard',
  props: ['voting', 'nominees', 'candidate'],
  components: {
    Modal,
  },
  setup() {
    const showModal = ref(false)

    const setShowModal = () => (showModal.value = true)

    const setHideModal = () => (showModal.value = false)

    return {
      showModal,
      setShowModal,
      setHideModal,
    }
  },
}
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
