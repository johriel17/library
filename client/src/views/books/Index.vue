<template>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">BOOKS</h4>
        <div class="clearfix"></div><hr>
        <div class="col-md-12">

        <ButtonGroup :addLabel="'Add Book'" :addPath="'books/add'" @search="search" @reload="reload" />

        </div>
        <div class="clearfix"></div><hr>
        <div class="single-table mb-2">
          <div class="table-responsive">
            <table class="table table-bordered text-center">
            <thead>
                <tr>
                    <th class="text-center" scope="col">#</th>
                    <th scope="col">Book Number</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Publisher</th>
                    <th class="text-center" scope="col">Year</th>
                    <th class="text-center" scope="col">Copies</th>
                    <th class="text-center" scope="col">Borrowed Copies</th>
                    <th class="text-center" scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="book.id" v-for="(book, index) in books">
                  <th class="text-center" scope="row">{{ (pagination.currentPage - 1 ) * 10 + index + 1 }}</th>
                  <td>{{ book.book_number }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.publisher }}</td>
                  <td class="text-center">{{ book.year }}</td>
                  <td class="text-center">{{ book.copies }}</td>
                  <td class="text-center">{{ book.borrowed_copies }}</td>
                  <td class="text-center">
                    <div class="btn-group btn-group-xs">
                      <router-link
                        :to="`books/view/${book.id}`"
                        class="btn btn-success"
                        title="VIEW"
                        ><i class="fa fa-eye"></i
                      ></router-link>

                      <router-link
                        :to="`books/edit/${book.id}`"
                        class="btn btn-primary"
                        title="EDIT"
                        ><i class="fa fa-edit"></i
                      ></router-link>

                      <a
                        href="javascript:void(0)"
                        ng-click="remove(data)"
                        class="btn btn-danger"
                        title="DELETE"
                        @click="deleteBook(book.id)"
                        ><i class="fa fa-trash"></i
                      ></a>
                    </div>
                  </td>
                </tr>
                <tr v-show="!books.length > 0">
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
</div>

</template>

<script>
import ButtonGroup from '@/components/ButtonGroup.vue'
import Pagination from '@/components/Pagination.vue'
import { useToast } from "vue-toastification";

export default {
    name : 'Index',
    components: {
        ButtonGroup,
        Pagination
    },
    data() {
        return {
            books : [],
            pagination : {},
            searchTxt : ''
        }
    },
    methods : {
        async fetchBooks() {
            const res = await fetch('http://localhost:4000/api/books')
            const data = await res.json()
            this.books = data.books
            this.pagination = data.pagination
        },
        async search(searchTxt){
          this.searchTxt = searchTxt
          const res = await fetch(`http://localhost:4000/api/books?search=${searchTxt}`)
          const data = await res.json()
          this.books = data.books
          this.pagination = data.pagination
        },
        async changePage(page){
          const res = await fetch(`http://localhost:4000/api/books?search=${this.searchTxt}&page=${page}`)
          const data = await res.json()
          this.books = data.books
          this.pagination = data.pagination
        },
        async deleteBook(id) {
          const toast = useToast();

          if(confirm('Are you sure?')){

          const res = await fetch(`http://localhost:4000/api/books/${id}`, {
            method: 'DELETE',
          })
            toast.warning("Book deleted successfully!");
            await this.fetchBooks()
          }
        },
        async reload(){
          this.searchTxt = ''
          await this.fetchBooks()
        }
    },
    async created() {
         await this.fetchBooks()
    }
    
}
</script>