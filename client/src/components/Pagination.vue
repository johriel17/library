<template>
  <div class="row">
    <div class="col-md-12">
      <ul class="pagination justify-content-center">
        <li :class="['page-item', pagination.currentPage === 1 ? 'disabled' : '']">
          <a class="page-link" href="javascript:void(0)" @click="$emit('first-page', 1)"
            ><sub>&laquo;&laquo;</sub></a
          >
        </li>
        <li :class="['page-item', 'prevPage', pagination.currentPage === 1 ? 'disabled' : '']">
          <a class="page-link" href="javascript:void(0)" @click="$emit('prev-page', pagination.currentPage - 1)">&laquo;</a>
        </li>
        <li ng-repeat="page in pages" class="page-item">
          <a class="page-link" href="javascript:void(0)">{{pagination.currentPage}}</a>
        </li>
        <li :class="['page-item', 'nextPage', pagination.currentPage >= pagination.totalPages ? 'disabled' : '']">
          <a class="page-link" href="javascript:void(0)" @click="$emit('next-page', pagination.currentPage + 1)">&raquo;</a>
        </li>
        <li :class="['page-item', pagination.currentPage >= pagination.totalPages ? 'disabled' : '']">
          <a class="page-link" href="javascript:void(0)" @click="$emit('last-page', pagination.totalPages)"
            ><sub>&raquo;&raquo;</sub>
          </a>
        </li>
      </ul>
      <div class="clearfix"></div>
      <div class="text-center">
        <sup class="text-primary">Page {{pagination.currentPage}} of {{pagination.totalPages}}</sup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name : 'Pagination',
    props : {
        pagination : Object
    }
}
</script>