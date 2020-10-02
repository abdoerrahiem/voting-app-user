<template>
  <div class="navbar">
    <router-link to="/" class="navbar__title">E-Voting</router-link>
    <div class="navbar__menus">
      <img v-if="user" :src="user.photo" alt="" />
      <small>Welcome, {{ user ? `${user.name}!` : 'Stranger!' }}</small>
      <router-link
        to="/quick-count"
        :class="$route.name === 'QuickCount' ? 'active' : ''"
      >
        <i class="fas fa-chart-bar" /> Quick Count
      </router-link>
      <router-link
        to="/nominees"
        :class="$route.name === 'Nominees' ? 'active' : ''"
      >
        <i class="fas fa-user-friends" /> Nominees
      </router-link>
      <router-link
        to="/voting"
        :class="$route.name === 'Voting' ? 'active' : ''"
      >
        <i class="fas fa-vote-yea" /> Voting
      </router-link>
      <router-link
        v-if="$route.name !== 'Login' && !user"
        to="/login"
        :class="$route.name === 'Login' ? 'active' : ''"
      >
        <i class="fas fa-sign-in-alt" /> Login
      </router-link>
      <router-link
        v-if="$route.name !== 'Login' && user"
        to="/login"
        @click="handleLogout"
      >
        <i class="fas fa-sign-in-alt" /> Logout
      </router-link>
    </div>
  </div>
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
.navbar {
  background-color: #4c6ef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 3rem;
  color: #fff;
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5rem;
}

.navbar__title {
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.5rem;
}

.navbar__menus {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar__menus a,
.navbar__menus small {
  margin-right: 2.5rem;
}

.navbar__menus small {
  font-weight: bold;
  font-style: italic;
}

.navbar__menus a {
  color: #fff;
  opacity: 0.5;
}

.navbar__menus a:hover {
  opacity: 1;
}

.navbar__menus a.active {
  opacity: 1;
  font-weight: bold;
}

.navbar__menus a.login {
  opacity: 1;
  border: 1px solid #fff;
  padding: 0.3rem 1rem;
}

.navbar__menus a.login:hover {
  opacity: 0.5;
}

.navbar__menus > img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  margin-right: 0.7rem;
}
</style>
