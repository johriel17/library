<template>
<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <h4 class="header-title">NEW BOOK</h4>
        <div class="clearfix"></div><hr>
        <form id="form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label> BOOOK NUMBER <i class="required">*</i></label>
                <input type="text" autocomplete="off" v-model="bookNumber" name="bookNumber" :class="['form-control', errors && errors.bookNumber ? 'border-danger' : '']" >
                <span v-show="errors.bookNumber" class="text-danger">{{ errors.bookNumber }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> TITLE <i class="required">*</i></label>
                <input type="text" autocomplete="off" v-model="title" name="title" :class="['form-control', errors && errors.title ? 'border-danger' : '']">
                <span v-show="errors.title" class="text-danger">{{ errors.title }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> AUTHOR <i class="required">*</i></label>
                <input type="text" autocomplete="off" v-model="author" name="author" :class="['form-control', errors && errors.author ? 'border-danger' : '']">
                <span v-show="errors.author" class="text-danger">{{ errors.author }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> PUBLISHER <i class="required">*</i> </label>
                <input type="text" autocomplete="off" v-model="publisher" name="publisher" :class="['form-control', errors && errors.publisher ? 'border-danger' : '']">
                <span v-show="errors.publisher" class="text-danger">{{ errors.publisher }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> YEAR <i class="required">*</i></label>
                <input type="text" autocomplete="off" v-model="year" name="year" :class="['form-control', errors && errors.year ? 'border-danger' : '']">
                <span v-show="errors.year" class="text-danger">{{ errors.year }}</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> COPIES <i class="required">*</i></label>
                <input type="number" autocomplete="off" v-model="copies" name="copies" :class="['form-control', errors && errors.copies ? 'border-danger' : '']">
                <span v-show="errors.copies" class="text-danger">{{ errors.copies }}</span>
              </div>
            </div>
          </div>  
        </form>
        <div class="clearfix"></div><hr>
        <div class="row">
          <div class="col-md-12">
            <div class="float-end">
              <button class="btn btn-primary btn-min" id="save" @click="addBook" ><i class="fa fa-save"></i> SAVE </button>
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
    name : 'Add',
    data() {
        return {
            bookNumber : '',
            title : '',
            author : '',
            publisher : '',
            year : '',
            copies : 1,
            //error handling
            errorMessage : '',
            errors : {}
        }
    },
    methods : {
         async addBook() {
           const toast = useToast();

            const bookData = {
                bookNumber: this.bookNumber,
                title: this.title,
                author: this.author,
                publisher: this.publisher,
                year: this.year,
                copies: this.copies,
            };


            try {
                const res = await fetch(`${process.env.VUE_APP_BASE_URL}/api/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success("Book added successfully!");
                    this.$router.push('/books')
                } else {
                console.error("Failed to add contact", res.status, res.statusText);
                this.errorMessage = data.error;
                this.errors = data.errors;
                toast.error(this.errorMessage);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
}
</script>

<style scoped>
.required {
    color: red;
}
</style>