<template>
  <div class="kanban-board">
    <div class="column" v-for="status in ['TODO', 'DOING', 'DONE']" :key="status">
      <h2>{{ status }}</h2>
      <draggable
        class="drag-area"
        :list="getTasksByStatus(status)"
        group="tasks"
        item-key="id"
        @change="(event) => onTaskMove(event, status)"
      >
        <template #item="{ element }">
          <div class="task-card">
            <h3>{{ element.title }}</h3>
            <p>{{ element.description }}</p>
            <button @click="deleteTask(element.id)" class="delete-btn">Delete</button>
          </div>
        </template>
      </draggable>
      <div v-if="status === 'TODO'" class="add-task-form">
        <input v-model="newTaskTitle" placeholder="New Task Title" />
        <button @click="addTask">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import draggable from 'vuedraggable';
import taskApi from '../api/taskApi';

const tasks = ref([]);
const newTaskTitle = ref('');

const fetchTasks = async () => {
  try {
    const response = await taskApi.getTasks();
    tasks.value = response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

onMounted(fetchTasks);

const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status);
};

const onTaskMove = async (event, newStatus) => {
  if (event.added) {
    const task = event.added.element;
    task.status = newStatus;
    try {
      await taskApi.updateTask(task.id, task);
    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert change if failed (simplified)
      fetchTasks();
    }
  }
};

const addTask = async () => {
  if (!newTaskTitle.value.trim()) return;
  const newTask = {
    title: newTaskTitle.value,
    description: '',
    status: 'TODO'
  };
  try {
    const response = await taskApi.createTask(newTask);
    tasks.value.push(response.data);
    newTaskTitle.value = '';
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

const deleteTask = async (id) => {
  try {
    await taskApi.deleteTask(id);
    tasks.value = tasks.value.filter(t => t.id !== id);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.column {
  background: var(--column-bg);
  padding: 15px;
  border-radius: 8px;
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.column h2 {
  background: var(--column-header-bg);
  padding: 10px;
  border-radius: 4px;
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--text-color);
}

.drag-area {
  flex-grow: 1;
  min-height: 100px;
}

.task-card {
  background: var(--task-card-bg);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: grab;
  text-align: left;
  color: var(--text-color);
}

.add-task-form {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

.add-task-form input {
  background: var(--task-card-bg);
  color: var(--text-color);
  border: 1px solid var(--column-header-bg);
  padding: 5px;
  border-radius: 4px;
  flex-grow: 1;
}

.add-task-form button {
  background: var(--primary-button-color);
  color: var(--text-color);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background: var(--delete-button-bg);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
