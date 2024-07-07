<template>
  <div class="row">
    <div class="col-md-8 d-flex align-items-center gap-2 mb-2">
        <router-link :to="addPath" class="btn btn-primary btn-min">
            <i class="fa fa-plus"></i> {{ addLabel }}
        </router-link>
        <button type="button" class="btn btn-warning btn-min" @click="reload">
            <i class="fa fa-refresh"></i> Reload
        </button>
    </div>
    <div class="col-md-4 d-inline">
      <div class="input-group-prepend">
        <input
          type="text"
          class="form-control search"
          placeholder="SEARCH HERE"
        />
      </div>
      <sup style="font-color: gray">Press Enter to search</sup>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    addPath: String,
    addLabel: String,
  },
  methods: {
    reload() {
      this.$emit("reload");
    },
  },
};
</script>