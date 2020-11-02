<template>
  <main>
    <div>
      <h5 class="text-center mb-2">
        <i class="fas fa-edit" /> Profil {{ userData.name }}
      </h5>
      <div class="container mt-2">
        <Spinner v-if="loading" />
        <form class="card mt-2" @submit.prevent="handleEdit">
          <span @click="handleShowModal">
            <img :src="userData.photo" :alt="userData.name" />
          </span>

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

      <div class="profile-modal w3-animate-top" v-if="showModal">
        <div class="profile-modal-body">
          <Alert v-if="success" :success="true" :message="success" />
          <Spinner v-if="loading" />
          <i class="fas fa-times" @click="handleHideModal" />
          <img class="image-ori" :src="userData.photo" :alt="userData.name" />
          <div class="input-file">
            <label for="file" class="bg-primary">
              <i class="fas fa-camera"></i> Edit Photo
            </label>
            <input type="file" id="file" @change="handleUploadPhoto" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { projectFirestore, projectStorage } from '../firebase'
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
    const showModal = ref(false)
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

    const handleShowModal = () => (showModal.value = true)
    const handleHideModal = () => (showModal.value = false)

    const handleEdit = () => {
      dispatch('users/editUser', {
        name: name.value,
        username: username.value,
        password: password.value,
      }).then(() => dispatch('users/getCurrentUser'))
    }

    const handleUploadPhoto = (e) => {
      const selectedFile = e.target.files[0]
      if (
        selectedFile &&
        [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/JPG',
          'image/JPEG',
        ].includes(selectedFile.type)
      ) {
        const storageRef = projectStorage.ref(selectedFile.name)
        const collectionRef = projectFirestore.collection('images')

        storageRef.put(selectedFile).on('state_changed', async () => {
          const url = await storageRef.getDownloadURL()
          collectionRef.add({ url })
          dispatch('users/editPhoto', { url }).then(() =>
            dispatch('users/getCurrentUser')
          )
        })
      }
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
      showModal,
      handleShowModal,
      handleHideModal,
      handleUploadPhoto,
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

img:hover {
  transform: scale(0.98);
}

.image-ori {
  height: 200px;
  width: 200px;
  border-radius: 2px;
  margin-top: 10px;
}

.profile-modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.profile-modal-body {
  background-color: #fff;
  width: 500px;
  min-height: 300px;
  margin: 0 auto;
  border-radius: 15px;
  padding: 30px 15px;
  position: relative;
}

.input-file {
  margin-top: 20px;
  text-align: center;
}

.profile-modal-body input {
  display: none;
}

.profile-modal-body label {
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.profile-modal-body > i {
  position: absolute;
  right: 47%;
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

@media (max-width: 500px) {
  .profile-modal-body {
    width: 100%;
  }
}
</style>
