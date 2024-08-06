<template>
<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">BORROW BOOK</h4>
        <div class="clearfix"></div><hr>
        <form id="form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label> BOOK <i class="required">*</i></label>
                <select v-model="selectedBook" class="form-control" :class="['form-control', errors && errors.borrowedBy ? 'border-danger' : '']">
                    <option value=""></option>
                    <option v-for="book in books" :key="book.id" :value="book.id">{{ book.val }}</option>
                </select>
                <span v-show="errors.selectedBook" class="text-danger">{{ errors.selectedBook }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> BORROWED BY <i class="required">*</i></label>
                <input type="text" autocomplete="off" v-model="borrowedBy" name="borrowed_by" :class="['form-control', errors && errors.borrowedBy ? 'border-danger' : '']">
                <span v-show="errors.borrowedBy" class="text-danger">{{ errors.borrowedBy }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> EMAIL <i class="required">*</i></label>
                <input type="text" autocomplete="off" v-model="borrowerEmail" name="borrowed_by" :class="['form-control', errors && errors.borrowerEmail ? 'border-danger' : '']">
                <span v-show="errors.borrowerEmail" class="text-danger">{{ errors.borrowerEmail }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> DUE DATE <i class="required">*</i></label>
                <VueDatePicker v-model="dueDate" :class="['form-control', errors && errors.dueDate ? 'border-danger' : '']" />
                <span v-show="errors.dueDate" class="text-danger">{{ errors.dueDate }}</span>
              </div>
            </div>
          </div>  
        </form>
        <div class="clearfix"></div><hr>
        <div class="row">
          <div class="col-md-12">
            <div class="float-end">
              <button class="btn btn-primary btn-min" id="save" @click="addBorrowedBook" ><i class="fa fa-save"></i> SAVE </button>
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
import VueDatePicker from 'vue3-datepicker'
export default {
    name : 'Add',
    components: {
        VueDatePicker
    },
    data() {
        return {
            selectedBook : '',
            borrowedBy : '',
            borrowerEmail: '',
            dueDate : null,
            //error handling
            errorMessage : '',
            errors : {},
            //select
            books : []
        }
    },
    methods : {
         async addBorrowedBook() {
           const toast = useToast();

            const borrowedBookData = {
                selectedBook: this.selectedBook,
                borrowedBy: this.borrowedBy,
                borrowerEmail: this.borrowerEmail,
                dueDate: this.dueDate,
            };
            
            // console.log(borrowedBookData)

            try {
                const res = await fetch(`${process.env.VUE_APP_BASE_URL}/api/borrowed-books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(borrowedBookData),
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success("Book added successfully!");
                    this.$router.push('/borrowed-books')
                } else {
                console.error("Failed to add contact", res.status, res.statusText);
                this.errorMessage = data.error;
                this.errors = data.errors;
                toast.error(this.errorMessage);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        async fetchBooks() {
            const res = await fetch(`${process.env.VUE_APP_BASE_URL}/api/select/select-book`)
            const data = await res.json()
            this.books = data
        }
    },
    async created() {
        await this.fetchBooks()
    }
}
</script>

<style scoped>
.required {
    color: red;
}
</style>