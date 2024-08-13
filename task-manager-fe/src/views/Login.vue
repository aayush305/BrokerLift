<template>
  <div class="login-container">
    <h2>When do you want it?</h2>
    <input v-model="answer" placeholder="Answer" autofocus />
    <button @click="login">Let's Go</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

export default defineComponent({
  setup() {
    const answer = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    if (localStorage.getItem('accessToken')) {
      router.push('/tasks')
    }

    const loginAttempt = async () => {
      try {
        const response = await login(answer.value)
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken)

          router.push('/tasks')
        } else {
          errorMessage.value = 'Incorrect answer'
        }
      } catch (error) {
        errorMessage.value = 'Login failed. Please try again.'
      }
    }

    return { answer, login: loginAttempt, errorMessage }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  width: 200px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

p {
  color: red;
}
</style>
