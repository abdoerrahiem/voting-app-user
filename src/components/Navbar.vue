<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <router-link
        class="navbar-brand"
        to="/"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
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
          <Spinner v-if="loading" class="mr-4" />
          <router-link
            v-if="user"
            :to="`/${user.username}`"
            class="nav-link active mr-4 w3-animate-top"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <img :src="user.photo" :alt="user.name" />
            {{ user.name }}
          </router-link>
          <router-link
            to="/quick-count"
            :class="
              $route.name === 'QuickCount' ? 'nav-link active' : 'nav-link'
            "
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <i class="fas fa-chart-bar" /> Quick Count
          </router-link>
          <router-link
            to="/nominees"
            :class="$route.name === 'Nominees' ? 'nav-link active' : 'nav-link'"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <i class="fas fa-user-friends" /> Nominasi
          </router-link>
          <router-link
            to="/voting"
            :class="$route.name === 'Voting' ? 'nav-link active' : 'nav-link'"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <i class="fas fa-vote-yea" /> Voting
          </router-link>
          <router-link
            v-if="$route.name !== 'Login' && !user"
            to="/login"
            :class="$route.name === 'Login' ? 'nav-link active' : 'nav-link'"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
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
import Spinner from './Spinner'

export default {
  name: 'Navbar',
  components: {
    Spinner,
  },
  setup() {
    const { state, dispatch } = useStore()

    const user = computed(() => state.users.userData)
    const loading = computed(() => state.users.loading)

    const handleLogout = () => dispatch('users/logout')

    return {
      user,
      loading,
      handleLogout,
    }
  },
}
</script>

<style scoped>
img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
}
</style>