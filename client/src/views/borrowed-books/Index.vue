<template>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">BORROWED BOOKS</h4>
        <div class="clearfix"></div><hr>
        <div class="col-md-12">

        <ButtonGroup :addLabel="'Borrow a Book'" :addPath="'borrowed-books/add'" @search="search" @reload="reload" />

        </div>
        <div class="clearfix"></div><hr>
        <div class="single-table mb-2">
          <div class="table-responsive">
            <table class="table table-bordered text-center">
            <thead>
                <tr>
                    <th class="text-center" scope="col">#</th>
                    <th scope="col">Book</th>
                    <th scope="col">Borrowed By</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Returned</th>
                    <th scope="col">Returned Date</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="book.id" v-for="(book, index) in borrowedBooks">
                  <th class="text-center" scope="row">{{ (pagination.currentPage - 1 ) * 10 + index + 1 }}</th>
                  <td>{{ book.Book.title }}</td>
                  <td>{{ book.borrowed_by }}</td>
                  <td>{{ book.due_date }}</td>
                  <td>{{ book.is_returned ? 'Yes' : 'No' }}</td>
                  <td class="text-center">{{ book.is_returned ? book.returned_date : ''}}</td>
                  <td class="text-center">
                    <div class="btn-group btn-group-xs">
                      <router-link
                        :to="`borrowed-books/view/${book.id}`"
                        class="btn btn-success"
                        title="VIEW"
                        ><i class="fa fa-eye"></i
                      ></router-link>

                      <router-link
                        :to="`borrowed-books/edit/${book.id}`"
                        class="btn btn-primary"
                        title="EDIT"
                        ><i class="fa fa-edit"></i
                      ></router-link>

                      <a
                        href="javascript:void(0)"
                        ng-click="remove(data)"
                        class="btn btn-danger"
                        title="DELETE"
                        @click="deleteBook(book)"
                        ><i class="fa fa-trash"></i
                      ></a>
                    </div>
                  </td>
                </tr>
                <tr v-show="!borrowedBooks.length > 0">
                  <td colspan="12" class="fw-bold">NO AVAILABLE DATA</td>
                </tr>
            </tbody>
            </table>
          </div>
        </div>
        <div class="clearfix"></div>
        <Pagination v-show="pagination.totalPages > 0" :pagination="pagination" @next-page="changePage" @last-page="changePage" @prev-page="changePage" @first-page="changePage" />
      </div>
    </div>
  </div>
  <ConfirmationModal v-if="showModal" @close-modal="closeModal" :title="modalTitle" :body="modalBody" @confirm="onConfirm" />
</div>

</template>

<script>
import ButtonGroup from '@/components/ButtonGroup.vue'
import Pagination from '@/components/Pagination.vue'
import { useToast } from "vue-toastification";
//modals
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue'

export default {
    name : 'Index',
    components: {
        ButtonGroup,
        Pagination,
        ConfirmationModal
    },
    data() {
        return {
            borrowedBooks : [],
            pagination : {},
            searchTxt : '',
            showModal : false,
            modalTitle : '',
            modalBody : '',
            bookToDelete : {}
        }
    },
    methods : {
        async fetchBorrowedBooks() {
            const res = await fetch('http://localhost:4000/api/borrowed-books')
            const data = await res.json()
            this.borrowedBooks = data.borrowed_books
            this.pagination = data.pagination
        },
        async search(searchTxt){
          this.searchTxt = searchTxt
          const res = await fetch(`http://localhost:4000/api/borrowed-books?search=${searchTxt}`)
          const data = await res.json()
          this.borrowedBooks = data.borrowed_books
          this.pagination = data.pagination
        },
        async changePage(page){
          const res = await fetch(`http://localhost:4000/api/borrowed-books?search=${this.searchTxt}&page=${page}`)
          const data = await res.json()
          this.borrowedBooks = data.borrowed_books
          this.pagination = data.pagination
        },
        async deleteBook(book) {
          this.showModal = true
          this.modalTitle = `Delete Borrowed Book`
          this.modalBody = `Are you sure you want to delete ${book.Book.title}?`
          this.bookToDelete = book
        },
        closeModal(){
          this.showModal = false
        },
        async onConfirm(){
          const toast = useToast();
          this.showModal = false
          await fetch(`http://localhost:4000/api/borrowed-books/${this.bookToDelete.id}/${this.bookToDelete.book_id}`, {
            method: 'DELETE',
          })

          toast.warning("Borrowed Book deleted successfully!");
          await this.fetchBorrowedBooks()
              
        },
        async reload(){
        this.searchTxt = ''
          await this.fetchBorrowedBooks()
        }
    },
    async created() {
         await this.fetchBorrowedBooks()
    }
    
}
</script>