<template>
  <div class="notFound">
    <div>
      <h3>The page you currently searched is not available.</h3>
      <router-link to="/"> <i class="fas fa-home" /> Back To Home </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style>
.notFound {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85%;
}

.notFound h3 {
  margin-bottom: 1.5rem;
}

.notFound a {
  background-color: #4c6ef5;
  display: block;
  margin: 0 auto;
  width: 10rem;
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  border-radius: 3px;
}

.notFound a:hover {
  opacity: 0.9;
}
</style>
