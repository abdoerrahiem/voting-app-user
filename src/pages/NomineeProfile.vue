<template>
  <div class="nomineeProfile">
    <div>
    <Spinner v-show="loading" />
    <table v-if="candidateData && !loading">
      <thead>
        <tr>
          <th>Ketua</th>
          <th>Wakil Ketua</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="self">
            <img :src="candidateData.photoOfChairman" alt="vice profile" />
            <div>
                <div>
              <p>Nama :</p>
              <p>Tanggal Lahir :</p>
              <p>Alamat :</p>
              <p>Pengalaman :</p>
            </div>
            <div>
              <p>{{candidateData.nameOfChairman}}</p>
              <p>{{candidateData.birthdayOfChairman}}</p>
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
            
          </td>

          <td class="self">
            <img :src="candidateData.photoOfViceChairman" alt="vice profile" />
            <div>
                <div>
              <p>Nama :</p>
              <p>Tanggal Lahir :</p>
              <p>Alamat :</p>
              <p>Pengalaman :</p>
            </div>
             <div>
              <p>{{candidateData.nameOfViceChairman}}</p>
              <p>{{candidateData.birthdayOfViceChairman}}</p>
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
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="buttons" v-if="candidateData && !loading">
    <button @click="setShowProfileModal('visionAndMission')">Lihat Visi dan Misi</button>
    <button @click="setShowProfileModal('motto')">Lihat Motto</button>
    </div>
    <ProfileModal v-if="showProfileModal && candidateData" :visionAndMission='visionAndMission' :motto='motto'  :candidateData='candidateData' @set-hide-profile-modal='setHideProfileModal' />
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {useRoute} from 'vue-router'
import profileImage from '../assets/profile.jpg'
import ProfileModal from '../components/ProfileModal'
import Spinner from '../components/Spinner'

export default {
  name: 'NomineeProfile',
  components: {
    ProfileModal,
    Spinner
  },
  setup() {
    const showProfileModal = ref(false)
    const visionAndMission = ref(true)
    const motto = ref(true)
    const store = useStore()
    const {params} = useRoute()

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
      loading
    }
  },
}
</script>

<style>
.nomineeProfile {
  height: 100%;
}

.nomineeProfile > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 3rem
}

.nomineeProfile img {
  height: 10rem;
  width: 10rem;
  border-radius: 100%;
}

.nomineeProfile table,
.nomineeProfile table th,
.nomineeProfile table tr > td {
  border: 1px solid #ddd;
  border-collapse: collapse;
  font-family: 'Quicksand', sans-serif;
  padding: 1rem 0;
}

.nomineeProfile table {
  width: 100%;
}

.nomineeProfile table th {
  font-weight: bold;
  font-size: 1.2rem;
}

.nomineeProfile .self {
  padding: 1rem;
}

.nomineeProfile .self img {
  display: block;
  margin: 0 auto;
  margin-bottom: 1.5rem;
}

.nomineeProfile .self td {
  padding: 0.5rem 0;
}

.nomineeProfile .self > div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nomineeProfile .self > div > div:first-child {
  flex: 1;
}

.nomineeProfile .self > div > div:last-child {
  flex: 1;
}

.nomineeProfile .self p {
  margin-bottom: 1rem;
}

.nomineeProfile .self > div ul li {
  list-style: none;
  margin-bottom: 0.5rem;
}

.nomineeProfile .buttons {
  margin: 0 auto;
}

.nomineeProfile .buttons button {
  width: 12rem;
  margin-right: 1rem;
  padding: 0.5rem 0;
  font-family: 'Quicksand', sans-serif;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 3px;
  background-color: #4c6ef5;
  color: #fff;
  letter-spacing: 2px;
}

.nomineeProfile .buttons button:hover {
  opacity: 0.7;
}
</style>
