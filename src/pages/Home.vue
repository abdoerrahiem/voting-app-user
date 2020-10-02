<template>
  <div class="home">
    <div class="home__images">
      <img src="../assets/evoting.png" alt="evoting" />
    </div>
    <div class="home__content">
      <h1>Selamat Datang di Aplikasi Voting Berbasis Online</h1>
      <h3>Pilih Nominasi Terbaik Pilihanmu Dimana Saja, Tanpa Ribet</h3>
      <router-link to="/voting" class="home__content--one"
        >Pilih Sekarang Juga</router-link
      >
      <router-link to="/nominees" class="home__content--two"
        >Review Para Nominasi</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>
.home {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  height: 100% - 7rem;
  margin-top: 3rem;
}

.home__images {
  flex: 1;
}

.home__content {
  flex: 2;
}

.home__content h1,
.home__content h3 {
  margin-bottom: 1rem;
}

.home__content a {
  border: 1px solid #fff;
  display: inline-block;
  width: 13rem;
  text-align: center;
  margin-right: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 0;
  border-radius: 2rem;
  color: #fff;
}

.home__content--one {
  background-color: #ff8e6e;
}

.home__content--two {
  background-color: #ffd571;
}
</style>
