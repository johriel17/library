<template>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">Books</h4>
        <div class="clearfix"></div><hr>
        <div class="col-md-12">

        <ButtonGroup :addLabel="'Add Book'" :addPath="'books/add'" @search="search" />

        </div>
        <div class="clearfix"></div><hr>
        <div class="single-table mb-5">
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
                    <th class="text-center" scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
      <tr :key="book.id" v-for="(book, index) in books">
        <th class="text-center" scope="row">{{ index + 1 }}</th>
        <td>{{ book.book_number }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.publisher }}</td>
        <td class="text-center">{{ book.year }}</td>
        <td class="text-center">{{ book.copies }}</td>
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
        <!-- <div class="row">
          <div class="col-md-12">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="javascript:void(0)" ng-click="load({ page: 1, search: searchTxt })"><sub>&laquo;&laquo;</sub></a>
              </li>
              <li class="page-item prevPage {{ !paginator.prevPage? 'disabled':'' }}">
                <a class="page-link" href="javascript:void(0)" ng-click="load({ page: paginator.page - 1, search: searchTxt })">&laquo;</a>
              </li>
              <li ng-repeat="page in pages" class="page-item {{ paginator.page == page.number ? 'active':''}}" >
                <a class="page-link" href="javascript:void(0)" class="text-center" ng-click="load({ page: page.number, search: searchTxt })">{{ page.number }}</a>
              </li>
              <li class="page-item nextPage {{ !paginator.nextPage? 'disabled':'' }}">
                <a class="page-link" href="javascript:void(0)" ng-click="load({ page: paginator.page + 1, search: searchTxt })">&raquo;</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="javascript:void(0)" ng-click="load({ page: paginator.pageCount, search: searchTxt })"><sub>&raquo;&raquo;</sub> </a>
              </li>
            </ul>
            <div class="clearfix"></div>
            <div class="text-center" ng-show="paginator.pageCount > 0">
              <sup class="text-primary">Page {{ paginator.pageCount > 0 ? paginator.page : 0 }} out of {{ paginator.pageCount }}</sup>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</div>

</template>

<script>
import ButtonGroup from '../../components/ButtonGroup.vue'


export default {
    name : 'Index',
    components: {
        ButtonGroup
    },
    data() {
        return {
            books : []
        }
    },
    methods : {
        async fetchBooks() {
            const res = await fetch('http://localhost:4000/api/books')
            const data = await res.json()
            return data
        },
        async search(searchTxt){
          const res = await fetch(`http://localhost:4000/api/books?search=${searchTxt}`)
          const data = await res.json()
          this.books = data
        }
    },
    async created() {
        this.books = await this.fetchBooks()
    }
    
}
</script>