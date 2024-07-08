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
                  <th class="text-end"> BORRWER EMAIL : </th>
                  <td class="italic">{{borrowedBook.borrower_email}}</td>
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
                <button :class="['btn btn-info btn-min', borrowedBook.is_returned ? 'disabled' : '']" @click="returnBook"><i class="fa fa-check"></i> RETURN </button>
                <button :class="['btn btn-info btn-min', borrowedBook.is_returned ? 'disabled' : '']" @click="notify"><i class="fa-regular fa-envelope"></i> NOTIFY </button>
                <router-link :to="`/borrowed-books/edit/${borrowedBook.id}`" class="btn btn-primary btn-min"><i class="fa fa-edit"></i> EDIT </router-link>
                <button class="btn btn-danger btn-min" @click="deleteBorrowedBook(borrowedBook)"><i class="fa fa-trash"></i> DELETE </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ReturnBook v-if="showModal" @close-modal="closeModal" @return-book="handleReturnBook" :book="borrowedBook" />
  <ConfirmationModal v-if="showDeleteModal" @close-modal="closeDeleteModal" :title="modalTitle" :body="modalBody" @confirm="onConfirm" />
</div>
</template>

<script>
import { useToast } from "vue-toastification";
//modals
import ReturnBook from '@/components/modals/ReturnBook.vue'
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue'
export default {
    name: 'View',
    components : {
      ReturnBook,
      ConfirmationModal
    },
    data() {
        return {
            borrowedBook : {},
            showModal : false,
            showDeleteModal : false,
            borrowedBookToDelete : {}
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
        closeDeleteModal(){
          this.showDeleteModal = false
        },
        async deleteBorrowedBook(borrowedBook){
          this.showDeleteModal = true
          this.modalTitle = `Delete Borrowed Book`
          this.modalBody = `Are you sure you want to delete ${borrowedBook.title}?`
          this.borrowedBookToDelete = borrowedBook
        },
        async onConfirm(){
          const toast = useToast();
          this.showModal = false
          await fetch(`http://localhost:4000/api/borrowed-books/${this.borrowedBookToDelete.id}/${this.borrowedBookToDelete.book_id}`, {
            method: 'DELETE',
          })

          toast.warning("Borrowed Book deleted successfully!");
          this.$router.push('/borrowed-books')
              
        },
        returnBook(){
          this.showModal = true
        },
        closeModal(){
          this.showModal = false
        },
        async handleReturnBook(returnDate, id, book_id){
          const toast = useToast()
            try{
                const res = await fetch(`http://localhost:4000/api/borrowed-books/return/${id}/${book_id}`, {
                  method : 'PUT',
                  headers : {
                    'Content-Type' : 'application/json'
                  },
                  body : JSON.stringify({returnDate})
                })
                const data = await res.json()
                if(res.ok){
                  this.showModal = false
                    this.borrowedBook = data[0]
                    toast.success("Borrowed Book Returned Successfully!")
                }
            }catch(error){
                console.log(error)
            }
        },
        async notify(){
          const toast = useToast()
          const res = await fetch(`http://localhost:4000/api/borrowed-books/notify?dueDate=${this.borrowedBook.due_date}&email=${this.borrowedBook.borrower_email}`)
          if(res.ok){
            toast.success("Email sent!")
          }
        }
    },
    async created(){
        this.borrowedBook = await this.fetchBorrowedBook(this.$route.params.id)
    }
}
</script>