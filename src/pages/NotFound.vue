<template>
  <main>
    <div>
      <h5 class="text-center mb-5">Halaman yang kamu cari tidak ditemukan.</h5>
      <router-link to="/" class="btn btn-primary mx-auto d-block rounded-pill">
        <i class="fas fa-home" /> Back To Home
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
a {
  width: 200px;
}

main {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
