<template>
  <div class="task-container">
    <div class="task-input-column">
      <textarea
        v-model="newTask"
        @keyup.enter="addTask($event)"
        placeholder="Add a new task"
        class="task-textarea"
      ></textarea>
      <div v-if="inputError" class="error-message">{{ inputError }}</div>
    </div>

    <div class="task-list-column">
      <h2>Task List</h2>
      <div v-if="isLoading" class="loading-message">Loading tasks, please wait...</div>
      <div
        v-else-if="tasks.length === 0 && Object.keys(pendingTasks).length === 0"
        class="no-tasks-message"
      >
        No tasks available. Start by adding a new task above.
      </div>
      <ul v-else>
        <li
          v-for="task in tasks"
          :key="task._id"
          :class="{ completed: task.completed }"
          class="task-item"
        >
          <input type="checkbox" v-model="task.completed" @change="markTask(task._id, task)" />
          <span class="task-text">{{ task.task }}</span>
        </li>

        <!-- Display pending tasks below the uploaded tasks -->
        <li
          v-for="pendingTask in Object.values(pendingTasks)"
          :key="pendingTask._id"
          :class="['task-item', 'pending', pendingTask.status]"
        >
          <input type="checkbox" disabled />
          <span class="task-text">{{ pendingTask.task }}</span>
          <button v-if="pendingTask.status === 'error'" @click="retryTask(pendingTask._id)">
            Retry
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Todo, TodoUpdate } from '@/types'
import { createTask, getTasks, updateTask } from '@/services/taskService'

export default defineComponent({
  setup() {
    const tasks = ref<Todo[]>([])
    const pendingTasks = ref<Record<string, Todo & { status: 'pending' | 'error' }>>({})
    const newTask = ref('')
    const inputError = ref('')
    const isLoading = ref(true)

    const fetchTasks = async () => {
      try {
        const response = await getTasks()
        tasks.value = response.data
      } catch (error) {
      } finally {
        isLoading.value = false
      }
    }

    const addTask = async (event: KeyboardEvent) => {
      if (event.shiftKey) {
        return
      }
      if (newTask.value.trim() === '') {
        inputError.value = 'Task description cannot be empty.'
        return
      }

      inputError.value = ''

      const taskId = Date.now().toString()
      const value = newTask.value
      const tempTask: Todo & { status: 'pending' | 'error' } = {
        _id: taskId,
        task: value,
        completed: false,
        status: 'pending'
      }

      pendingTasks.value[taskId] = tempTask
      newTask.value = ''

      try {
        const response = await createTask({ task: value })
        tasks.value = response.data
        delete pendingTasks.value[taskId]
      } catch (error) {
        pendingTasks.value[taskId].status = 'error'
      }
    }

    const retryTask = async (taskId: string) => {
      const task = pendingTasks.value[taskId]
      if (!task) return

      try {
        task.status = 'pending'
        const response = await createTask({ task: task.task })
        tasks.value = response.data
        delete pendingTasks.value[taskId]
      } catch (error) {
        task.status = 'error'
      }
    }

    const markTask = async (id: string, task: TodoUpdate) => {
      try {
        const response = await updateTask(id, task)
        tasks.value = response.data
      } catch (error) {}
    }

    onMounted(() => {
      fetchTasks()
    })

    return { tasks, pendingTasks, newTask, addTask, markTask, retryTask, inputError, isLoading }
  }
})
</script>

<style scoped>
.task-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.task-input-column {
  flex: 1;
  min-width: max-content;
  margin-right: 20px;
}

.task-list-column {
  flex: 1;
  min-width: max-content;
}

.task-textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  font-size: 16px;
  line-height: 1.5;
}

.error-message {
  color: red;
  margin-top: 5px;
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-item .task-text {
  flex-grow: 1;
  word-wrap: break-word;
  white-space: pre-wrap;
  margin-right: 10px;
}

input[type='checkbox'] {
  margin-right: 10px;
}

.completed .task-text {
  text-decoration: line-through;
  color: gray;
}

.pending.error {
  color: red;
}

button {
  margin-left: auto;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.no-tasks-message {
  padding: 10px;
  text-align: center;
  color: #666;
  font-style: italic;
}

/* Responsive styles for small screens */
@media (max-width: 768px) {
  .task-container {
    flex-direction: column;
  }

  .task-input-column {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .task-textarea {
    min-height: 100px;
  }
}
</style>
