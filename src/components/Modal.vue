<template>
  <div class="modal">
    <div>
      <i class="fas fa-times" @click="handleClick" />
      <div>
        <Alert v-if="success" :success="true" :message="success" />
        <Alert v-if="error" :error="true" :message="error" />
        <Alert
          v-if="!isAuth"
          :error="true"
          :message="`Silahkan login untuk dapat melakukan voting.`"
        />
        <p>Anda yakin memilih pasangan ini?</p>
        <div class="buttons">
          <button @click="handleVote" :disabled="!isAuth || loading">
            Yes
          </button>
          <button @click="handleClick">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Alert from './Alert'

export default {
  name: 'Modal',
  components: {
    Alert,
  },
  props: ['candidateId'],
  setup(props, { emit }) {
    const { dispatch, state } = useStore()

    const handleClick = () => emit('set-hide-modal')

    const handleVote = () => dispatch('votes/addVote', props.candidateId)

    const error = computed(() => state.votes.error)

    const success = computed(() => state.votes.success)

    const loading = computed(() => state.votes.loading)

    const isAuth = computed(() => state.users.isAuth)

    return {
      handleClick,
      handleVote,
      error,
      success,
      loading,
      isAuth,
    }
  },
}
</script>

<style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal > div {
  background-color: #fff;
  height: 15rem;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
}

.modal p {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.modal button {
  border: none;
  outline: none;
  width: 7rem;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #fff;
  border-radius: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
}

.modal button:hover {
  opacity: 0.8;
}

.modal button:first-child {
  background: #228b22;
}

.modal button:nth-child(2) {
  background: #dc143c;
}

.modal .buttons {
  text-align: center;
}

.modal > div > i {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 1.5rem;
  color: #fff;
  background: #dc143c;
  border-radius: 100%;
  height: 1.5rem;
  width: 1.5rem;
  text-align: center;
  cursor: pointer;
}
</style>
