<template>
<div>
    <div class="modal-overlay"></div>
    <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{book.title}}</h5>
                <button type="button" @click="closeModal" class="btn-close" ></button>
            </div>
            <form id="form" @submit.prevent="returnBook">
            <div class="modal-body">
                        
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label> RETURN DATE <i class="required">*</i></label>
                            <VueDatePicker  v-model="returnDate" class="form-control" />
                            <span v-show="error" class="text-danger">{{ error }}</span>
                        </div>
                    </div>  
                </div>  
                            
            </div>
            <div class="modal-footer">
                <button type="button" @click="closeModal" class="btn btn-secondary">Close</button>
                <button type="submit" class="btn btn-primary">Borrow</button>
            </div>
            </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import VueDatePicker from 'vue3-datepicker'

export default {
    name : 'ReturnBook',
    components : {
        VueDatePicker
    },
    props : {
        book : Object
    },
    data() {
        return {
            returnDate : new Date(),
            error: ''
        }
    },
    methods : {
        closeModal(){
            this.$emit('close-modal')
        },
        returnBook() {

            if(this.returnDate === null){
                this.error = 'Please select a date'
                return
            }
            
            this.$emit('return-book', this.returnDate, this.book.id, this.book.book_id)
        }
    }
}
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); 
  z-index: 1040; 
}


.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050;
}
</style>