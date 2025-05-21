<template>
  <div class="search-input">
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span class="search-icon">🔍</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Поиск...'
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.search-input {
  position: relative;
}

.search-input input {
  padding: 0.5rem 1rem 0.5rem 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
