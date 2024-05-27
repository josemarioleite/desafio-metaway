<template>
<v-autocomplete
  :label="Label"
  :items="Items"
  item-title="label"
  variant="outlined"
  density="comfortable"
  class="select"
/>
</template>

<script lang="ts" setup>
interface Props {
  Items: Array<any>
  Label: String
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
}
</style>