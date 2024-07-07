<template>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="card">
      <div class="card-body">
        <div class="header-title">VIEW BOOK INFORMATION</div>
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
              </table>
            </div> 
          </div>

          <div class="col-md-12">
            <div class="clearfix"></div><hr>
          </div>
          <div class="col-md-12">
            <div class="d-flex justify-content-end gap-2">
                <a href="#/college/edit/{{ data.College.id }}" class="btn btn-primary btn-min"><i class="fa fa-edit"></i> EDIT </a>
                <button class="btn btn-danger btn-min" ng-click="remove(data.College)"><i class="fa fa-trash"></i> DELETE </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'View',
    data() {
        return {
            book : {}
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
            
        }
    },
    async created(){
        this.book = await this.fetchBook(this.$route.params.id)
    }
}
</script>