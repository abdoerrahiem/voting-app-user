<template>
  <div v-show="show" :class="`alert ${success ? 'success' : 'error'}`">
    <p>
      <i
        :class="`fas ${success ? 'fa-check-circle' : 'fa-exclamation-circle'}`"
      />
      {{ message }}
    </p>
    <i class="fas fa-times" @click="hideAlert" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Alert',
  props: ['message', 'success', 'error'],
  setup() {
    const show = ref(true)
    const hideAlert = () => (show.value = false)

    return {
      show,
      hideAlert,
    }
  },
}
</script>

<style>
.alert {
  padding: 1rem;
  position: relative;
  border-radius: 5px;
}

.alert.success {
  background-color: #228b22;
}

.alert.error {
  background-color: #dc143c;
}

.alert.none {
  display: none;
}

.alert p {
  color: #fff;
  font-size: 0.8rem !important;
  text-align: center;
  margin: 0 !important;
}

.alert > i {
  position: absolute;
  right: 5px;
  top: 2px;
  cursor: pointer;
  color: #fff;
}
</style>
