<template>
  <div class="metric-card">
    <h3>{{ title }}</h3>
    <div class="metric-value">{{ value }}</div>
    <div v-if="change" class="metric-change" :class="changeClass">
      {{ change }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  value: [String, Number],
  change: String
});

const changeClass = computed(() => {
  if (!props.change) return '';
  return props.change.startsWith('+') ? 'positive' : 'negative';
});
</script>

<style scoped>
.metric-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.metric-change {
  font-size: 0.9rem;
}

.metric-change.positive {
  color: #2ecc71;
}

.metric-change.negative {
  color: #e74c3c;
}
</style>
