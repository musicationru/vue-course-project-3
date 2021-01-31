<template>
  <span :class="['badge', status]">{{ name }}</span>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    type: {
      type: String,
      validator(value) {
        return ['done', 'cancel', 'active', 'pending'].includes(value)
      }
    }
  },
  setup(props) {
    const name = ref('')
    const status = ref('')

    watch(() => {
      switch (props.type) {
      case 'done': 
        name.value = 'Завершен'
        status.value = 'primary'
      break
      case 'active':
        name.value = 'Активен'
        status.value = 'primary'
      break
      case 'pending':
        name.value = 'Выполняется'
        status.value = 'warning'
      break
      case 'cancel':
        name.value = 'Отменен'
        status.value = 'danger'
    }
    }) 
  
    return {
      name,
      status
    }
  }
}
</script>