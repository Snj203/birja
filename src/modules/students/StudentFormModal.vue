<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>{{ editingStudent ? 'Редактировать ученика' : 'Добавить ученика' }}</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Имя:</label>
          <input v-model="formData.name" required>
        </div>

        <div class="form-group">
          <label>Уровень:</label>
          <select v-model="formData.level" required>
            <option value="beginner">Начинающий</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="formData.email" type="email">
        </div>

        <div class="form-actions">
          <button type="button" @click="close" class="cancel-button">
            Отмена
          </button>
          <button type="submit" class="submit-button">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  student: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
  name: '',
  level: 'beginner',
  email: ''
});

watch(() => props.student, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
  } else {
    formData.value = {
      name: '',
      level: 'beginner',
      email: ''
    };
  }
}, { immediate: true });

const close = () => {
  emit('close');
};

const submitForm = () => {
  emit('save', formData.value);
  close();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-button {
  background: #f0f0f0;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
