<template>
  <button
    class="module-button"
    :class="{ active }"
    @click="$emit('click')"
  >
    <slot></slot>
    <status-badge v-if="count" :count="count" />
  </button>
</template>

<script setup>
import StatusBadge from '@/components/ui/StatusBadge.vue';

defineProps({
  active: Boolean,
  count: {
    type: Number,
    default: 0
  }
});

defineEmits(['click']);
</script>

<style scoped>
.module-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.module-button:hover {
  background: #e0e0e0;
}

.module-button.active {
  background: #3498db;
  color: white;
}
</style>
