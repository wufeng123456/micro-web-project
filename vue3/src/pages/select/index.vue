<template>
  <div class="select-container">
    <div class="select-content">
      <LeftNav />

      <selectDetail />
    </div>
  </div>
</template>

<script setup>
import LeftNav from './components/leftNav.vue'
import selectDetail from './components/selectDetail.vue'
</script>

<style lang="scss">
.select{
  &-container{
    margin-top: 50px;
  }
  &-content{
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
}
</style>
