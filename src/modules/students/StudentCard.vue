<template>
  <div class="student-card">
    <div class="student-avatar">
      {{ student.name.charAt(0) }}
    </div>
    <div class="student-info">
      <h3>{{ student.name }}</h3>
      <p>Уровень: {{ student.level }}</p>
      <progress-bar :value="student.progress" />
    </div>
    <div class="student-actions">
      <button @click="$emit('edit', student)">✏️</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  student: {
    type: Object,
    required: true
  }
});

defineEmits(['edit']);
</script>

<style scoped>
.student-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.student-avatar {
  width: 40px;
  height: 40px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.student-info {
  flex: 1;
}

.student-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
