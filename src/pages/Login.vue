<template>
  <div class="login">
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
  </div>
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

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  height: 83%;
  margin-top: 3rem;
}

.login > div {
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
}

.login__left {
  flex: 1;
  width: 25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login__right {
  flex: 1;
  background-color: #4c6ef5;
  color: #fff;
  width: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login__right > div {
  position: relative;
}

.login__right span {
  font-size: 1rem;
}

.login__right h1,
.login__right h3 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.login__right form {
  margin-top: 1.5rem;
}

.login__right form input,
.login__right form button {
  border: none;
  outline: none;
  background-color: #f0f2f5;
  font-family: 'Quicksand', sans-serif;
}

.login__right form i:not(:last-child) {
  color: rgb(123, 117, 117);
  margin-right: 0.5rem;
}

.login__right form > div {
  background: #f0f2f5;
  margin-bottom: 1.3rem;
  padding: 0.7rem 1.2rem;
  border-radius: 2rem;
  width: 100%;
}

.login__right form button {
  background-color: #4c6ef5;
  color: #fff;
  float: right;
  padding: 0.7rem 2rem;
  border-radius: 2rem;
  margin-top: 1rem;
  letter-spacing: 3px;
  cursor: pointer;
  border: 1px solid #fff;
}

.login__right form button:hover {
  background-color: #fff;
  color: #4c6ef5;
  font-weight: bold;
}

.balloon {
  height: 3rem;
  width: 3rem;
  background-color: #8fb7f2;
  position: absolute;
  border-radius: 100%;
  left: 0.3rem;
  top: -1rem;
  opacity: 0.3;
}
</style>
