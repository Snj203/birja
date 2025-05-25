<template>
  <div class="notification" :class="type" @click="handleClose">
    <span class="message">{{ message }}</span>
    <button v-if="closable" class="close-btn" @click.stop="handleClose">&times;</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Пропсы
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info', // Возможные значения: 'success', 'error', 'warning', 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000 // По умолчанию 3 секунды
  },
  closable: {
    type: Boolean,
    default: true // Можно ли закрыть вручную
  }
});

// Эмит события закрытия
const emit = defineEmits(['close']);

// Таймер для автоматического закрытия
const timer = ref(null);

const handleClose = () => {
  clearTimeout(timer.value);
  emit('close');
};

// Автоматическое закрытие по истечению duration
onMounted(() => {
  if (props.duration > 0) {
    timer.value = setTimeout(() => {
      emit('close');
    }, props.duration);
  }
});

onUnmounted(() => {
  clearTimeout(timer.value);
});
</script>

<style scoped>
.notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 4px;
  color: #fff;
  animation: slideIn 0.3s ease-out;
  position: relative;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.notification.success {
  background-color: #2ecc71;
}

.notification.error {
  background-color: #e74c3c;
}

.notification.warning {
  background-color: #f1c40f;
  color: #333;
}

.notification.info {
  background-color: #3498db;
}

.message {
  flex-grow: 1;
  font-size: 14px;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

.close-btn:hover {
  opacity: 0.7;
}

/* Анимация появления и исчезновения */
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Анимация для TransitionGroup */
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.3s ease;
}

.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
