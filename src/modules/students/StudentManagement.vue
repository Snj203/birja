<template>
  <div class="student-management">
    <div class="toolbar">
      <search-input v-model="searchQuery" />
      <button class="add-button" @click="openAddModal">
        + Добавить ученика
      </button>
    </div>

    <div class="student-list">
      <student-card
        v-for="student in filteredStudents"
        :key="student.id"
        :student="student"
        @edit="openEditModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import StudentCard from './StudentCard.vue';

const props = defineProps({
  students: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-student', 'edit-student']);

const searchQuery = ref('');

const filteredStudents = computed(() => {
  return props.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openAddModal = () => {
  emit('add-student');
};

const openEditModal = (student) => {
  emit('edit-student', student);
};
</script>

<style scoped>
.student-management {
  padding: 1rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
}

.add-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.student-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
