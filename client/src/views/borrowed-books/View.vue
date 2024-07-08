<template>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">VIEW BORROWED BOOK INFORMATION</h4>
        <div class="clearfix"></div><hr>
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped">
                <tr>
                  <th class="text-end" style="width:15%"> BOOK : </th>
                  <td class="italic">{{borrowedBook.title}}</td>
                </tr>
                <tr>
                  <th class="text-end"> BORRWED BY : </th>
                  <td class="italic">{{borrowedBook.borrowed_by}}</td>
                </tr>
                <tr>
                  <th class="text-end"> DUE DATE : </th>
                  <td class="italic">{{borrowedBook.due_date}}</td>
                </tr>
                <tr>
                  <th class="text-end"> RETURNED : </th>
                  <td class="italic">{{borrowedBook.is_returned ? 'Yes' : 'No'}}</td>
                </tr>
                <tr>
                  <th class="text-end"> RETURNED DATE : </th>
                  <td class="italic">{{borrowedBook.is_returned ? borrowedBook.returned_date : ''}}</td>
                </tr>
              </table>
            </div> 
          </div>

          <div class="col-md-12">
            <div class="clearfix"></div><hr>
          </div>
          <div class="col-md-12">
            <div class="d-flex justify-content-end gap-2">
                <button :class="['btn btn-info btn-min', borrowedBook.is_returned ? 'disabled' : '']" @click="returnBorrowedBook(borrowedBook.id, borrowedBook.book_id)"><i class="fa fa-check"></i> RETURN </button>
                <router-link :to="`/borrowed-books/edit/${borrowedBook.id}`" class="btn btn-primary btn-min"><i class="fa fa-edit"></i> EDIT </router-link>
                <button class="btn btn-danger btn-min" @click="deleteBorrowedBook(borrowedBook.id)"><i class="fa fa-trash"></i> DELETE </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
    name: 'View',
    data() {
        return {
            borrowedBook : {}
        }
    },
    methods : {
        async fetchBorrowedBook(id) {
            const res = await fetch(`http://localhost:4000/api/borrowed-books/${id}`)
            const data = await res.json()

            if(res.ok){
                return data[0]
            }else{
                return data
            }
            
        },
        async deleteBorrowedBook(id){
          const toast = useToast()
          if(confirm('Are you sure?')){

          const res = await fetch(`http://localhost:4000/api/borrowed-books/${id}`, {
            method: 'DELETE',
          })
            toast.warning('Book deleted successfully!')
            this.$router.push('/borrowed-books')
          }
        },
        async returnBorrowedBook(id, book_id){
            const toast = useToast()
            try{
                const res = await fetch(`http://localhost:4000/api/borrowed-books/return/${id}/${book_id}`)
                const data = await res.json()
                if(res.ok){
                    this.borrowedBook = data[0]
                    toast.success("Borrowed Book Returned Successfully!")
                }
            }catch(error){
                console.log(error)
            }

        }
    },
    async created(){
        this.borrowedBook = await this.fetchBorrowedBook(this.$route.params.id)
    }
}
</script>