<script setup>
import { ref, onMounted } from 'vue'
import KanbanBoard from './components/KanbanBoard.vue'

const isDarkMode = ref(true)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('light-mode', !isDarkMode.value)
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
}

onMounted(() => {
  // Load saved preference or default to dark mode
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode)
  }
  document.body.classList.toggle('light-mode', !isDarkMode.value)
})
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1>Kanban Board</h1>
      <button 
        @click="toggleDarkMode" 
        class="dark-mode-toggle"
        :class="{ 'light-mode': !isDarkMode }"
      >
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>
    <KanbanBoard />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dark-mode-toggle {
  background-color: var(--primary-button-color);
  color: var(--text-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.dark-mode-toggle:hover {
  opacity: 0.9;
}

.dark-mode-toggle.light-mode {
  background-color: var(--primary-button-color);
}
</style>
