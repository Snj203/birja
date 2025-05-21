<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Новое занятие</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Ученик:</label>
          <select v-model="formData.studentId" required>
            <option
              v-for="student in students"
              :key="student.id"
              :value="student.id"
            >
              {{ student.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Дата и время:</label>
          <input v-model="formData.date" type="datetime-local" required>
        </div>

        <div class="form-group">
          <label>Продолжительность (минут):</label>
          <input v-model="formData.duration" type="number" min="30" step="15" required>
        </div>

        <div class="form-group">
          <label>Тема:</label>
          <input v-model="formData.topic">
        </div>

        <div class="form-actions">
          <button type="button" @click="close" class="cancel-button">
            Отмена
          </button>
          <button type="submit" class="submit-button">
            Создать занятие
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  students: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
  studentId: props.students[0]?.id || '',
  date: '',
  duration: 60,
  topic: ''
});

const close = () => {
  emit('close');
};

const submitForm = () => {
  emit('save', formData.value);
  close();
};
</script>

<style scoped>
/* Стили аналогичны StudentFormModal */
</style>
