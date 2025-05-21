<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1>{{ title }}</h1>
        <span class="version">v{{ version }}</span>
      </div>
      <nav class="user-menu">
        <button class="notification-btn" @click="toggleNotifications">
          <span v-if="unreadNotifications" class="badge">{{ unreadNotifications }}</span>
          <i class="icon-bell"></i>
        </button>
        <dropdown-menu :user="currentUser" />
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import DropdownMenu from './DropdownMenu.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'TutorPro'
  },
  version: {
    type: String,
    default: '1.0.0'
  }
});

const currentUser = ref({
  name: 'Иван Петров',
  role: 'Репетитор'
});

const unreadNotifications = ref(3);

const toggleNotifications = () => {
  console.log('Show notifications');
};
</script>

<style scoped>
.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.version {
  font-size: 0.8rem;
  opacity: 0.7;
}

.user-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
