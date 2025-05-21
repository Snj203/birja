<template>
  <span class="status-badge">
    {{ count }}
  </span>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  background-color: #e74c3c;
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
