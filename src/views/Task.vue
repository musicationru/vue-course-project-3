<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="setStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('done')">Завершить</button>
      <button class="btn danger" @click="setStatus('cancel')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  props: ['id'],
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const task = computed(() => store.getters.currentTask(props.id))

    async function setStatus(newStatus) {
      task.value.status = newStatus
      await store.dispatch('updateTask', task.value)
      router.push('/')
    }

    return {
      task,
      setStatus
    }
  },
  name: 'Task',
  components: {AppStatus}
}
</script>

<style scoped>

</style>