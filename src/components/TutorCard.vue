<template>
  <div class="tutor-card" @click="$emit('click')">
    <h3>{{ tutor.name }}</h3>
    <p><strong>Предмет:</strong> {{ tutor.subject }}</p>
    <p><strong>Цена:</strong> {{ tutor.price }} ₽/час</p>
    <p><strong>Рейтинг:</strong> {{ tutor.rating }}/5</p>
  </div>
</template>

<script>
export default {
  props: {
    tutor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.tutor-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}
.tutor-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
