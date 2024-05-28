<template>
<div class="read" @click="copyContent">
  <div class="read__subtitle">
    <span>{{ Subtitle }}:</span>
  </div>

  <div class="read__content">
    <span>{{ Content }}</span>
  </div>

  <v-snackbar v-model="snackbar">
    {{ text }}
  </v-snackbar>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  Subtitle: string
  Content: string | number | null
}

defineOptions({
  name: 'VRead'
})

const snackbar = ref(false)
const text = ref('Texto foi copiado')
const props = defineProps<Props>()

const copyContent = () => {
  if (!props.Content) return

  navigator.clipboard.writeText(props?.Content.toString())
    .then(() => {
      snackbar.value = true

      setTimeout(() => {
        snackbar.value = false
      }, 1000);
    })
}
</script>

<style lang="scss" scoped>
.read {
  height: 60px;
  width: 100%;
  border: 1px dashed #2b51a1;
  border-radius: 5px;

  &__subtitle {
    margin: 5px 0 0 10px;
    color: #2b51a1;
  }

  &__content {
    display: flex;
    justify-content: center;
    padding: 2px;

    span {
      font-size: 1.2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.read:hover {
  cursor: pointer;
  background: #a7defd;
}
</style>