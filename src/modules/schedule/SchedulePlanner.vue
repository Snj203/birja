<template>
  <div class="schedule-planner">
    <div class="controls">
      <div class="view-options">
        <button
          v-for="view in views"
          :key="view"
          :class="{ active: currentView === view }"
          @click="currentView = view"
        >
          {{ viewLabels[view] }}
        </button>
      </div>
      <button @click="showEventForm" class="add-event">
        + Новое занятие
      </button>
    </div>

    <div class="calendar-container">
      <!-- Здесь можно интегрировать полноценный календарь -->
      <div class="calendar-placeholder">
        Календарь ({{ currentView }} вид)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const views = ['day', 'week', 'month'];
const viewLabels = {
  day: 'День',
  week: 'Неделя',
  month: 'Месяц'
};

const currentView = ref('week');
const emit = defineEmits(['add-event']);

const showEventForm = () => {
  emit('add-event');
};
</script>

<style scoped>
.schedule-planner {
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-options button {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.view-options button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.add-event {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-placeholder {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #777;
}
</style>
