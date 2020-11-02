<template>
  <main>
    <div>
      <h5 class="text-center mb-2">
        <i class="fas fa-edit" /> Profil {{ userData.name }}
      </h5>
      <div class="container mt-2">
        <Spinner v-if="loading" />
        <form class="card mt-2" @submit.prevent="handleEdit">
          <img :src="userData.photo" :alt="userData.name" />
          <Alert v-if="success" :success="true" :message="success" />
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" class="form-control" id="name" v-model="name" />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-edit" /> Update
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import Spinner from '../components/Spinner'
import Alert from '../components/Alert'

export default {
  components: {
    Spinner,
    Alert,
  },
  setup() {
    const name = ref('')
    const username = ref('')
    const password = ref('')
    const { state, dispatch } = useStore()

    const userData = computed(() => state.users.userData)
    const loading = computed(() => state.users.loading)
    const error = computed(() => state.users.error)
    const success = computed(() => state.users.success)

    watchEffect(() => {
      if (userData.value) {
        name.value = userData.value.name
        username.value = userData.value.username
      }
    })

    const handleEdit = () => {
      dispatch('users/editUser', {
        name: name.value,
        username: username.value,
        password: password.value,
      }).then(() => dispatch('users/getCurrentUser'))
    }

    return {
      userData,
      loading,
      error,
      handleEdit,
      name,
      username,
      password,
      success,
    }
  },
}
</script>

<style scoped>
form {
  width: 320px;
  margin: 0 auto;
  padding: 20px;
}

img {
  height: 150px;
  width: 150px;
  border-radius: 100%;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}
</style>
