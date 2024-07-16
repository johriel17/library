<template>
  <div class="row">
    <div class="col-lg-12 mt-3">
      <div class="card">
        <div class="card-body">
          <h4 class="header-title">EDIT BORROWED BOOK</h4>
          <div class="clearfix"></div>
          <hr />
          <form id="form">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label> BOOK <i class="required">*</i></label>
                  <select disabled v-model="selectedBook" class="form-control">
                    <option value=""></option>
                    <option
                      v-for="book in books"
                      :key="book.id"
                      :value="book.id"
                    >
                      {{ book.val }}
                    </option>
                  </select>
                  <span v-show="errors.book" class="text-danger">{{
                    errors.book
                  }}</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label> BORROWED BY <i class="required">*</i></label>
                  <input
                    type="text"
                    autocomplete="off"
                    v-model="borrowedBy"
                    name="borrowed_by"
                    :class="[
                      'form-control',
                      errors && errors.borrowedBy ? 'border-danger' : '',
                    ]"
                  />
                  <span v-show="errors.borrowedBy" class="text-danger">{{
                    errors.borrowedBy
                  }}</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label> EMAIL <i class="required">*</i></label>
                  <input
                    type="text"
                    autocomplete="off"
                    v-model="borrowerEmail"
                    name="borrower_emaail"
                    :class="[
                      'form-control',
                      errors && errors.borrowerEmail ? 'border-danger' : '',
                    ]"
                  />
                  <span v-show="errors.borrowerEmail" class="text-danger">{{
                    errors.borrowerEmail
                  }}</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label> DUE DATE <i class="required">*</i></label>
                  <VueDatePicker
                    v-model="dueDate"
                    :class="[
                      'form-control',
                      errors && errors.dueDate ? 'border-danger' : '',
                    ]"
                  />
                  <span v-show="errors.dueDate" class="text-danger">{{
                    errors.dueDate
                  }}</span>
                </div>
              </div>
            </div>
          </form>
          <div class="clearfix"></div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <div class="float-end">
                <button
                  class="btn btn-primary btn-min"
                  id="save"
                  @click="updateBorrowedBook(borrowedBookId)"
                >
                  <i class="fa fa-save"></i> UPDATE
                </button>
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
import VueDatePicker from "vue3-datepicker";
export default {
  name: "Add",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      selectedBook: "",
      borrowedBookId: null,
      borrowedBy: "",
      borrowerEmail : '',
      dueDate: null,
      //error handling
      errorMessage: "",
      errors: {},
      //select
      books: [],
      borrowedBook: {},
    };
  },
  methods: {
    async fetchBorrowedBoook(id) {
      const res = await fetch(`http://localhost:4000/api/borrowed-books/${id}`);
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        return data;
      }
    },
    async updateBorrowedBook(id) {
      const toast = useToast();

      const borrowedBookData = {
        selectedBook: this.selectedBook,
        borrowedBy: this.borrowedBy,
        borrowerEmail: this.borrowerEmail,
        dueDate: this.dueDate,
      };

      // console.log(borrowedBookData)

      try {
        const res = await fetch(`http://localhost:4000/api/borrowed-books/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrowedBookData),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Book Updated Successfully!");
          this.$router.push("/borrowed-books");
        } else {
          console.error("Failed to edit contact", res.status, res.statusText);
          this.errorMessage = data.error;
          this.errors = data.errors;
          toast.error(this.errorMessage);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchBooks() {
      const res = await fetch("http://localhost:4000/api/select/select-book");
      const data = await res.json();
      this.books = data;
    },
  },
  async created() {
    await this.fetchBooks();

    this.borrowedBook = await this.fetchBorrowedBoook(this.$route.params.id);
    if (this.borrowedBook) {
      this.borrowedBookId = this.borrowedBook.id;
      this.selectedBook = this.borrowedBook.book_id;
      this.borrowedBy = this.borrowedBook.borrowed_by;
      this.borrowerEmail = this.borrowedBook.borrower_email;
      this.dueDate = new Date(this.borrowedBook.due_date);
    }
  },
};
</script>

<style scoped>
.required {
  color: red;
}
</style>