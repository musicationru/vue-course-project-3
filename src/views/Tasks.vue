<template>
  <app-loader v-if="loading"></app-loader>
  <div v-if="!loading">
    <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>
    <h3 class="text-white" v-if="tasks.length > 0">Всего активных задач: {{ store.getters.activeTasks }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date(task.date).toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="open(task.id)">Посмотреть</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'
import { useStore } from 'vuex' 
import { useRouter } from 'vue-router' 
import { onMounted, ref, computed } from 'vue'
export default {
  name: 'Tasks',
  setup() {
    const store = useStore()
    const router = useRouter()
    const tasks = computed(() => {
      return store.getters.allTasks
    })
    
    const loading = ref(false)
    
    onMounted(async () => {
      loading.value = true
      await store.dispatch('getTasks')
      loading.value = false
    })



    function open(id) {
      router.push(`/task/${id}`)
    }

    return {
      store,
      tasks,
      open,
      loading
    }
  },
  components: {AppStatus, AppLoader}
}
</script>
