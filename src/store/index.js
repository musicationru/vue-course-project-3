import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
    state() {
        return {
            tasks: []
        }
    },
    getters: {
        allTasks(state) {
            return state.tasks
        },
        activeTasks(state) {
            return state.tasks.filter(task => task.status == 'active').length
        },
        currentTask: state => id => {
            return state.tasks.find(task => task.id == id)
        }
    },
    mutations: {
        pushTask(state, newTask) {
            state.tasks.push(newTask)
        },
        loadTasks(state, data) {
            state.tasks = Object.keys(data).map(key => {
                return {
                    id: key,
                    ...data[key]
                }
            })
        }
    },
    actions: {
        async addTask(_, newTask) {
            await axios.post('https://vue-course-project-3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', newTask)
        },
        async getTasks(context) {
            const {data} = await axios.get('https://vue-course-project-3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
            if (data) {
                context.commit('loadTasks', data)
            }
        },
        async updateTask(_, task) {
            console.log(task);
            await axios.put(`https://vue-course-project-3-default-rtdb.europe-west1.firebasedatabase.app/tasks/${task.id}.json`, task)
        }
    }

})

