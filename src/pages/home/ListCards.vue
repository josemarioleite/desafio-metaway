<template>
<div class="list-cards">
  <div class="list-cards--title">
    <span>{{ Title }}</span>
  </div>

  <div class="list-cards__item">
    <template v-for="(item, index) in Items" :key="index">
      <CardContact :Contact="item" />
    </template>
  </div>
</div>
</template>

<script lang="ts" setup>
import CardContact from './CardContact.vue'

interface Props {
  Title: string
  Items: []
}

defineProps<Props>()

defineOptions({
  name: 'List-Cards',
  components: { CardContact }
})
</script>

<style lang="scss" scoped>
.list-cards {
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 98%;
  
  &--title {
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
      margin: 10px 0 10px 30px;
      font-size: 2.5rem;
    }
  }
  
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: scroll;
    margin-left: 20px;
    padding: 10px;
    width: 100%;
    height: 100%;
    gap: 50px;
  }
}
</style>