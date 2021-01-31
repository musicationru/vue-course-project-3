<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!title || !date || !description" @click.prevent="createTask">Создать</button>
  </form>
</template>


<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default {
  emits: ['create-task'],
  name: 'New',
  setup() {
    const title = ref('')
    const description = ref('')
    const date = ref('')
    const router = useRouter()
    const store = useStore()

    async function createTask() {
      const newTask = {
        title: title.value,
        description: description.value,
        date: date.value,
        status: 'active'
      }
      await store.dispatch('addTask', newTask)
      router.push('/')
    }
    return {
      createTask,
      title,
      description,
      date
    }
  }
}
</script>