<template>
  <div class="analytics-dashboard">
    <h2>Аналитика</h2>

    <div class="metrics-grid">
      <metric-card
        v-for="metric in metrics"
        :key="metric.title"
        :title="metric.title"
        :value="metric.value"
        :change="metric.change"
      />
    </div>

    <div class="charts">
      <div class="chart-container">
        <h3>Прогресс учеников</h3>
        <div class="chart-placeholder">
          <!-- Здесь будет график -->
          График прогресса
        </div>
      </div>

      <div class="chart-container">
        <h3>Посещаемость</h3>
        <div class="chart-placeholder">
          <!-- Здесь будет график -->
          График посещаемости
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MetricCard from './MetricCard.vue';

const metrics = ref([
  { title: 'Всего учеников', value: 24, change: '+2' },
  { title: 'Средний прогресс', value: '73%', change: '+5%' },
  { title: 'Предстоящих занятий', value: 8, change: '-1' },
  { title: 'Завершено занятий', value: 142, change: '+12' }
]);
</script>

<style scoped>
.analytics-dashboard {
  padding: 1rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.chart-container {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-placeholder {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #777;
}
</style>
