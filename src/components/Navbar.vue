<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <h3>E-VOTING</h3>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link
            to="/quick-count"
            :class="
              $route.name === 'QuickCount' ? 'nav-link active' : 'nav-link'
            "
          >
            <i class="fas fa-chart-bar" /> Quick Count
          </router-link>
          <router-link
            to="/nominees"
            :class="$route.name === 'Nominees' ? 'nav-link active' : 'nav-link'"
          >
            <i class="fas fa-user-friends" /> Nominasi
          </router-link>
          <router-link
            to="/voting"
            :class="$route.name === 'Voting' ? 'nav-link active' : 'nav-link'"
          >
            <i class="fas fa-vote-yea" /> Voting
          </router-link>
          <router-link
            v-if="$route.name !== 'Login' && !user"
            to="/login"
            :class="$route.name === 'Login' ? 'nav-link active' : 'nav-link'"
          >
            <i class="fas fa-sign-in-alt" /> Masuk
          </router-link>
          <router-link
            class="nav-link"
            v-if="$route.name !== 'Login' && user"
            to="/login"
            @click="handleLogout"
          >
            <i class="fas fa-sign-in-alt" /> Keluar
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Navbar',
  setup() {
    const { state, dispatch } = useStore()

    const user = computed(() => state.users.userData)

    const handleLogout = () => dispatch('users/logout')

    return {
      user,
      handleLogout,
    }
  },
}
</script>

<style>
</style>
