<template>
  <div class="row">
    <div class="col-lg-12 mt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="header-title">DASHBOARD</h4>
          <div class="clearfix"></div>
          <hr />
          <div class="row">
            <div class="col-md-4 col-12 mb-2 item">
              <div @click="goToBooks" class="card bg-primary bg-gradient shadow">
                <div class="card-body">
                  <h5 class="card-title text-center text-light">{{books}} TOTAL BOOKS</h5>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 mb-2 item">
              <div @click="goToBorrowedBooks" class="card bg-primary bg-gradient shadow">
                <div class="card-body">
                  <h5 class="card-title text-center text-light">20 BORROWED BOOOKS</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      books : 0,
      borrowedBooks : 0
    }
  },
  methods:{
    goToBooks(){
      this.$router.push('/books')
    },
    goToBorrowedBooks(){
      this.$router.push('/books')
    },
    async countBooks(){
      const res = await fetch('http://localhost:4000/api/dashboard')
      const data = await res.json()
      return data
    }
  },
  async created() {
    this.books = await this.countBooks()
  }
};
</script>

<style scoped>
.item:hover{
  cursor: pointer;
}
</style>
