<template>

  <Navbar />
  <div class="container-md">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";
</style>
