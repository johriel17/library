<template>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">VIEW BOOK INFORMATION</h4>
        <div class="clearfix"></div><hr>
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped">
                <tr>
                  <th class="text-end" style="width:15%"> BOOK NUMBER : </th>
                  <td class="italic">{{book.book_number}}</td>
                </tr>
                <tr>
                  <th class="text-end"> TITLE : </th>
                  <td class="italic">{{book.title}}</td>
                </tr>
                <tr>
                  <th class="text-end"> AUTHOR : </th>
                  <td class="italic">{{book.author}}</td>
                </tr>
                <tr>
                  <th class="text-end"> PUBLISHER : </th>
                  <td class="italic">{{book.publisher}}</td>
                </tr>
                <tr>
                  <th class="text-end"> YEAR : </th>
                  <td class="italic">{{book.year}}</td>
                </tr>
                <tr>
                  <th class="text-end"> COPIES : </th>
                  <td class="italic">{{book.copies}}</td>
                </tr>
                <tr>
                  <th class="text-end"> AVAILABLE COPIES : </th>
                  <td class="italic">{{book.copies - book.borrowed_copies}}</td>
                </tr>
              </table>
            </div> 
          </div>

          <div class="col-md-12">
            <div class="clearfix"></div><hr>
          </div>
          <div class="col-md-12">
            <div class="d-flex justify-content-end gap-2">
              <button :class="['btn btn-info btn-min', book.copies - book.borrowed_copies <= 0 ? 'disabled' : '']" @click="borrowBook"><i class="fa fa-book"></i> BORROW </button>
                <router-link :to="`/books/edit/${book.id}`" class="btn btn-primary btn-min"><i class="fa fa-edit"></i> EDIT </router-link>
                <button class="btn btn-danger btn-min" @click="deleteBook(book.id)"><i class="fa fa-trash"></i> DELETE </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BorrowBook v-if="showModal" @close-modal="closeModal" @borrow-book="handleBorrowBook" :book="book" />
</div>
</template>

<script>
import { useToast } from "vue-toastification";
//modals
import BorrowBook from "@/components/modals/BorrowBook.vue"

export default {
    name: 'View',
    components : {
      BorrowBook
    },
    data() {
        return {
            book : {},
            showModal : false
        }
    },
    methods : {
        async fetchBook(id) {
            const res = await fetch(`http://localhost:4000/api/books/${id}`)
            const data = await res.json()

            if(res.ok){
                return data[0]
            }else{
                return data
            }
            
        },
        async deleteBook(id){
          const toast = useToast()
          if(confirm('Are you sure?')){

          const res = await fetch(`http://localhost:4000/api/books/${id}`, {
            method: 'DELETE',
          })
            toast.warning('Book deleted successfully!')
            this.$router.push('/books')
          }
        },
         borrowBook(){
          this.showModal = true
        },
        closeModal(){
          this.showModal = false
        },
        async handleBorrowBook(borrowedBook) {
          const toast = useToast()
          const res = await fetch('http://localhost:4000/api/books/borrow-book', {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(borrowedBook)
          })

          if(res.ok){
            this.showModal = false
            toast.success("Book Successfully Borrowed!")
            this.book = await this.fetchBook(this.$route.params.id)
          }

        }
    },
    async created(){
        this.book = await this.fetchBook(this.$route.params.id)
    }
}
</script>