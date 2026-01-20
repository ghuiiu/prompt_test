import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getTasks() {
        return apiClient.get('/tasks');
    },
    createTask(task) {
        return apiClient.post('/tasks', task);
    },
    updateTask(id, task) {
        return apiClient.put(`/tasks/${id}`, task);
    },
    deleteTask(id) {
        return apiClient.delete(`/tasks/${id}`);
    },
};
