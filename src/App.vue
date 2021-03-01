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
  font-family: 'Quicksand', sans-serif !important;
  background-color: #f0f2f5;
}

main {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-family: 'Quicksand', sans-serif !important;
}

.card {
  width: 25rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
