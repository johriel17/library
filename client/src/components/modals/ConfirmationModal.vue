<template>
<div>
    <div class="modal-overlay"></div>
    <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
                <button type="button" @click="closeModal" class="btn-close" ></button>
            </div>
            <div class="modal-body">
                    {{body}}
            </div>
            <div class="modal-footer">
                <button type="button" @click="closeModal" class="btn btn-secondary">Close</button>
                <button type="submit" @click="$emit('confirm')" class="btn btn-primary">Confirm</button>
            </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name : 'ConfirmationModal',
    props : {
        title : String,
        body : String
    },
    methods : {
        closeModal() {
            this.$emit('close-modal')
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