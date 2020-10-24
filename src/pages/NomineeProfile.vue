<template>
  <main>
    <Spinner v-if="loading" />
      <ProfileModal v-if="showProfileModal && candidateData" :visionAndMission='visionAndMission' :motto='motto'  :candidateData='candidateData' @set-hide-profile-modal='setHideProfileModal' />
      <div class="container" v-if="candidateData && !loading">
    <div class="row w3-animate-bottom">
      <div class="col col-12 col-md-6 border mb-3 rounded">
        <h3 class="text-center">Ketua</h3>
        <img :src="candidateData.photoOfChairman" alt="vice profile" class="d-block mx-auto my-4" />
        <div class="row">
          <div class="col ">
            <p>Nama :</p>
              <p>Tanggal Lahir :</p>
              <p>Alamat :</p>
              <p>Pengalaman :</p>
          </div>
          <div class="col">
            <p>{{candidateData.nameOfChairman}}</p>
              <p>{{moment(candidateData.birthdayOfChairman).format('LL')}}</p>
              <p>{{candidateData.addressOfChairman}}</p>
              <p>
                <ul>
                  <li v-for="(exp, index) in candidateData.experienceOfChairman" :key="index">
                    {{index + 1}}. {{exp}}
                  </li>
                </ul>
              </p>
          </div>
      </div>
        </div>
        <div class="col col-12 col-md-6 border mb-3 rounded">
        <h3 class="text-center">Wakil Ketua</h3>
        <img :src="candidateData.photoOfViceChairman" alt="vice profile" class="d-block mx-auto my-4" />
        <div class="row">
          <div class="col">
            <p>Nama :</p>
              <p>Tanggal Lahir :</p>
              <p>Alamat :</p>
              <p>Pengalaman :</p>
          </div>
          <div class="col">
            <p>{{candidateData.nameOfViceChairman}}</p>
              <p>{{moment(candidateData.birthdayOfViceChairman).format('LL')}}</p>
              <p>{{candidateData.addressOfViceChairman}}</p>
              <p>
                <ul>
                  <li v-for="(exp, index) in candidateData.experienceOfViceChairman" :key="index">
                    {{index + 1}}. {{exp}}
                  </li>
                </ul>
              </p>
          </div>
      </div>
        </div>
      </div>
      <div class="row">
        <div class="col buttons">
          <button @click="setShowProfileModal('visionAndMission')" class="btn btn-primary rounded-pill">Lihat Visi dan Misi</button>
    <button @click="setShowProfileModal('motto')" class="btn btn-primary rounded-pill">Lihat Motto</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import * as moment from 'moment/moment'
import 'moment/locale/id'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import profileImage from '../assets/profile.jpg'
import ProfileModal from '../components/ProfileModal'
import Spinner from '../components/Spinner'

export default {
  name: 'NomineeProfile',
  components: {
    ProfileModal,
    Spinner,
  },
  setup() {
    const showProfileModal = ref(false)
    const visionAndMission = ref(true)
    const motto = ref(true)
    const store = useStore()
    const { params } = useRoute()

    onMounted(() => store.dispatch('candidates/getCandidate', params.id))

    const setShowProfileModal = (args) => {
      showProfileModal.value = true

      if (args === 'visionAndMission') {
        visionAndMission.value = true
        motto.value = false
      } else if (args === 'motto') {
        motto.value = true
        visionAndMission.value = false
      }
    }

    const setHideProfileModal = () => (showProfileModal.value = false)

    const candidateData = computed(() => store.state.candidates.candidateData)

    const loading = computed(() => store.state.candidates.loading)

    return {
      profileImage,
      showProfileModal,
      visionAndMission,
      motto,
      setShowProfileModal,
      setHideProfileModal,
      candidateData,
      loading,
      moment,
    }
  },
}
</script>

<style scoped>
img {
  height: 10rem;
  width: 10rem;
  border-radius: 100%;
}

ul li {
  list-style: none;
  margin-bottom: 0.5rem;
}

button {
  margin: 10px;
  padding: 5px 16px;
  font-size: 10px;
  width: 120px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
