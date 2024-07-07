<template>
  <div class="my-5">
    <h2>Books</h2>
    <table class="table table-bordered">
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
              to="books/view"
              class="btn btn-success"
              title="VIEW"
              ><i class="fa fa-eye"></i
            ></router-link>

            <router-link
              to="books/edit"
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
    </tbody>
  </table>
  </div>
</template>

<script>

export default {
    name : 'BooksView',
    components: {
        
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
        }
    },
    async created() {
        this.books = await this.fetchBooks()
    }
}
</script>