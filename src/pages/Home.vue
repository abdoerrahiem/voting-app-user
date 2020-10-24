<template>
  <main>
    <div class="container py-6 home">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-12 col-lg-4 col-md-6 col-sm-12 w3-animate-left">
          <img src="../assets/evoting.png" alt="evoting" class="img-fluid" />
        </div>
        <div
          class="col col-12 col-lg-8 col-md-6 col-sm-12 text-center w3-animate-right"
        >
          <h3 class="mb-3">
            Selamat Datang di Aplikasi Voting Berbasis Online
          </h3>
          <p class="mb-3">
            Pilih Nominasi Terbaik Pilihanmu Dimana Saja, Tanpa Ribet
          </p>
          <router-link
            to="/voting"
            class="btn btn-success rounded-pill mr-3 mb-3 px-3"
            >Pilih Sekarang Juga</router-link
          >
          <router-link
            to="/nominees"
            class="btn btn-warning rounded-pill mr-3 mb-3 px-3 text-white"
            >Review Para Nominasi</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home',
}
</script>

