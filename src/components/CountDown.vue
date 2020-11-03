<template>
  <div v-if="showCountDown" class="mt-2 text-center">
    <p class="font-weight-bold text-uppercase">Voting akan dimulai dalam:</p>
    <p class="font-weight-bold bg-warning rounded text-white py-2 px-3">
      {{ days }} Hari {{ hours }} Jam {{ minutes }} Menit {{ seconds }} Detik
    </p>
  </div>
  <div v-if="showCountDown2" class="mt-2 text-center">
    <p class="font-weight-bold text-uppercase">Voting berakhir dalam:</p>
    <p class="font-weight-bold bg-warning rounded text-white py-2 px-3">
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
  emits: ['set-show-card', 'set-hide-card'],
  setup(props, { emit }) {
    const days = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const showCountDown = ref(false)
    const showCountDown2 = ref(false)
    const showAlert = ref(false)

    setInterval(() => {
      const chosenDate = new Date('Nov 4, 2020 09:00:00').getTime()
      const chosenDate2 = new Date('Nov 4, 2020 13:00:00').getTime()

      const now = new Date().getTime()

      const distance = chosenDate - now
      const distance2 = chosenDate2 - now

      if (distance > 0) {
        emit('set-hide-card')
        showCountDown.value = true
        showCountDown2.value = false
        days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
        hours.value = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
      } else if (distance2 > 0) {
        emit('set-show-card')
        showCountDown.value = false
        showCountDown2.value = true
        days.value = Math.floor(distance2 / (1000 * 60 * 60 * 24))
        hours.value = Math.floor(
          (distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        minutes.value = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60))
        seconds.value = Math.floor((distance2 % (1000 * 60)) / 1000)
      } else {
        emit('set-hide-card')
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