<template>
  <div class="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { setAuthToken } from './utils'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const { dispatch } = useStore()

    onMounted(() => dispatch('users/getCurrentUser'))
    watchEffect(() => {
      if (localStorage.Authorization) {
        setAuthToken(localStorage.Authorization)
      }
    })
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', sans-serif;
  background-color: #f0f2f5;
  overflow-x: hidden;
}

a {
  text-decoration: none;
}

.app {
  width: 100vw;
  height: 100vh;
}
</style>
