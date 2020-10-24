<template>
  <div class="profileModal">
    <div class="container w3-animate-bottom">
      <div v-show="visionAndMission">
        <ul>
          <li
            v-for="(vm, index) in candidateData.visionAndMission"
            :key="index"
          >
            {{ index + 1 }}. {{ vm }}
          </li>
        </ul>
      </div>
      <div v-show="motto">
        <p class="motto">{{ candidateData.motto }}</p>
      </div>
      <i class="fas fa-times" @click="handleClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileModal',
  props: ['visionAndMission', 'motto', 'candidateData'],
  setup(props, { emit }) {
    const handleClick = () => emit('set-hide-profile-modal')

    return {
      handleClick,
    }
  },
}
</script>

<style>
.profileModal {
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

.profileModal > div {
  background-color: #fff;
  min-height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  padding: 0 1rem;
}

.profileModal .motto {
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
}

.profileModal i {
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

.profileModal ul {
  padding: 1rem;
}

.profileModal ul li {
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  list-style: none;
}
</style>
