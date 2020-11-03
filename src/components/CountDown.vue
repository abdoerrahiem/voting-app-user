<template>
  <div v-if="showCountDown" class="mt-2 text-center">
    <p class="font-weight-bold text-uppercase">Voting akan dimulai dalam:</p>
    <p class="bg-info rounded text-white">
      {{ days }} Hari {{ hours }} Jam {{ minutes }} Menit {{ seconds }} Detik
    </p>
  </div>
  <div v-if="showCountDown2" class="mt-2 text-center">
    <p class="font-weight-bold text-uppercase">Voting akan berakhir dalam:</p>
    <p class="bg-info rounded text-white">
      {{ days }} Hari {{ hours }} Jam {{ minutes }} Menit {{ seconds }} Detik
    </p>
  </div>
  <Alert
    class="mt-2"
    v-if="showAlert"
    :message="`Masa untuk voting telah berakhir.`"
    :error="true"
  />
</template>

<script>
import { ref } from 'vue'
import Alert from './Alert'

export default {
  components: {
    Alert,
  },
  props: ['setShowCard', 'setHideCard'],
  setup() {
    const days = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const showCountDown = ref(false)
    const showCountDown2 = ref(false)
    const showAlert = ref(false)

    setInterval(() => {
      const chosenDate = new Date('Nov 3, 2020 19:52:00').getTime()
      const chosenDate2 = new Date('Nov 3, 2020 19:53:00').getTime()

      const now = new Date().getTime()

      const distance = chosenDate - now
      const distance2 = chosenDate2 - now

      if (distance > 0) {
        // props.setHideCard()
        showCountDown.value = true
        showCountDown2.value = false
        days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
        hours.value = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
      } else if (distance2 > 0) {
        // props.setShowCard()
        showCountDown.value = false
        showCountDown2.value = true
        days.value = Math.floor(distance2 / (1000 * 60 * 60 * 24))
        hours.value = Math.floor(
          (distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        minutes.value = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60))
        seconds.value = Math.floor((distance2 % (1000 * 60)) / 1000)
      } else {
        // props.setHideCard()
        showAlert.value = true
        showCountDown.value = false
        showCountDown2.value = false
      }
    }, 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
      showCountDown,
      showCountDown2,
      showAlert,
    }
  },
}
</script>

<style>
</style>