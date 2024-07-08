<template>
  <nav class="navbar navbar-expand-md">
    <div class="container-md">
      <router-link class="navbar-brand" to="/">Library</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :class="['nav-link', isActive('/') ? 'active' : '']" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="['nav-link', isActive('/books') ? 'active' : '']" to="/books">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="['nav-link', isActive('/borrowed-books') ? 'active' : '']" to="/borrowed-books">Borrowed Books</router-link>
          </li>
          <li class="nav-item">
            <router-link :class="['nav-link', isActive('/about') ? 'active' : '']" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar", 
  computed : {
    currentPath() {
      return this.$route.path
    },
    isActive() {
      return (path) => {
        if(path === '/'){
          return this.currentPath === path
        }
        const regex = new RegExp(`^${path}`);
        return regex.test(this.currentPath);
      };
    },
  }
};
</script>

<style scoped>
.navbar {
  background-color: #e3f2fd;
}

.active{
  text-decoration: underline double !important;

  color:blue !important
}

</style>