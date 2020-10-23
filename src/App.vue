<template>
  <div class="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  created() {
    this.$store.dispatch('users/getCurrentUser')
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
}

main {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

/* a {
  text-decoration: none;
}

.app {
  width: 100vw;
  height: 100vh;
} */

/* width */
/* ::-webkit-scrollbar {
  width: 7px;
} */

/* Track */
/* ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
} */

/* Handle */
/* ::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
} */

/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #f0f2f5;
} */
</style>
