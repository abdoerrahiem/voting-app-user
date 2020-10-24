<template>
  <!-- <div class="login">
    <div>
      <div class="login__left">
        <img src="../assets/login.png" alt="login" />
      </div>
      <div class="login__right">
        <div>
          <div class="balloon"></div>
          <h1>Welcome!</h1>
          <h3>Masukan Account Anda!</h3>
          <Alert v-if="error !== null" :error="true" :message="error" />
          <form @submit.prevent="handleSubmit">
            <div>
              <i class="fas fa-user" />
              <input type="text" placeholder="Username" v-model="username" />
            </div>
            <div>
              <i class="fas fa-lock" />
              <input
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button type="submit">
              <i class="fas fa-sign-in-alt" /> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div> -->
  <main>
    <div class="container">
      <div
        class="row d-flex flex-wrap justify-content-center align-items-center"
      >
        <div class="col col-12 col-md-6 w3-animate-left">
          <img src="../assets/login.png" alt="login" class="img-fluid" />
        </div>
        <div
          class="col col-12 col-md-6 bg-primary p-4 rounded w3-animate-right"
        >
          <h2 class="text-center text-white">Welcome!</h2>
          <h4 class="text-center text-white">Masukan Account Anda!</h4>
          <Alert v-if="error !== null" :error="true" :message="error" />
          <form @submit.prevent="handleSubmit">
            <div>
              <i class="fas fa-user" />
              <input type="text" placeholder="Username" v-model="username" />
            </div>
            <div>
              <i class="fas fa-lock" />
              <input
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <button
              type="submit"
              class="btn btn-dark rounded-pill px-5 mt-3 text-white"
            >
              <i class="fas fa-sign-in-alt" /> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Alert from '../components/Alert'

export default {
  name: 'Login',
  components: {
    Alert,
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const { dispatch, state } = useStore()
    const { push } = useRouter()

    const error = computed(() => state.users.error)
    const loading = computed(() => state.users.loading)
    const isAuth = computed(() => state.users.isAuth)

    watchEffect(() => isAuth.value && !loading.value && push('/voting'))

    const handleSubmit = () => {
      dispatch('users/loginUser', {
        username: username.value,
        password: password.value,
      }).then(() => dispatch('users/getCurrentUser'))
    }

    return {
      username,
      password,
      handleSubmit,
      error,
    }
  },
}
</script>

<style scoped>
form {
  margin-top: 1.5rem;
}

form input {
  border: none;
  outline: none;
  background-color: #f0f2f5;
  font-family: 'Quicksand', sans-serif;
}

form i:not(:last-child) {
  color: rgb(123, 117, 117);
  margin-right: 0.5rem;
}

form > div {
  background: #f0f2f5;
  margin-bottom: 1.3rem;
  padding: 0.7rem 1.2rem;
  border-radius: 2rem;
  width: 100%;
}
</style>
