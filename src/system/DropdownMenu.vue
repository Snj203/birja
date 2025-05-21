<template>
  <div class="dropdown">
    <button class="dropdown-toggle">
      {{ user.name }}
    </button>
    <div class="dropdown-menu">
      <button @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['logout']);

const logout = () => {
  emit('logout');
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
  min-width: 120px;
  display: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
