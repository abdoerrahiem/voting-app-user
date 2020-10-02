<template>
  <div class="nominees__card">
    <div>
      <div class="nominees__card-chairman">
        <img :src="candidate.photoOfChairman" alt="profile" />
        <p>{{ candidate.nameOfChairman }}</p>
        <p>(Ketua)</p>
      </div>
      <div class="nominees__card-vicechairman">
        <img :src="candidate.photoOfViceChairman" alt="profile" />
        <p>{{ candidate.nameOfViceChairman }}</p>
        <p>(Wakil Ketua)</p>
      </div>
    </div>
    <div class="nominees__card-link">
      <router-link
        v-if="nominees"
        :to="{
          name: 'NomineeProfile',
          params: { id: candidate._id },
        }"
        >Lihat Selengkapnya &#8594;</router-link
      >
      <a v-if="voting" @click="setShowModal">Submit</a>
    </div>
  </div>
  <Modal
    v-show="showModal"
    @set-hide-modal="setHideModal"
    :candidateId="candidate._id"
  />
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

<style>
</style>
