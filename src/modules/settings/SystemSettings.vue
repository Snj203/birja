<template>
  <div class="system-settings">
    <h2>Настройки системы</h2>

    <form @submit.prevent="saveSettings">
      <div class="setting-group">
        <h3>Внешний вид</h3>
        <div class="setting-option">
          <label>Тема:</label>
          <select v-model="settings.theme">
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
          </select>
        </div>
      </div>

      <div class="setting-group">
        <h3>Уведомления</h3>
        <div class="setting-option">
          <label>
            <input type="checkbox" v-model="settings.notifications">
            Email-уведомления
          </label>
        </div>
      </div>

      <button type="submit" class="save-button">
        Сохранить настройки
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['save']);

const settings = ref({ ...props.settings });

const saveSettings = () => {
  emit('save', settings.value);
};
</script>

<style scoped>
.system-settings {
  padding: 1rem;
  max-width: 600px;
}

.setting-group {
  margin-bottom: 2rem;
}

.setting-option {
  margin: 1rem 0;
  display: flex;
  align-items: center;
}

.setting-option label {
  margin-right: 1rem;
}

.save-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
