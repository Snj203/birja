<template>
  <div class="home">
    <h1>Найдите репетитора</h1>

    <!-- Фильтры -->
    <div class="filters">
      <input v-model="searchQuery" placeholder="Поиск по предмету" />
      <select v-model="selectedSubject">
        <option value="">Все предметы</option>
        <option v-for="subject in subjects" :key="subject">{{ subject }}</option>
      </select>
      <input v-model="maxPrice" type="number" placeholder="Макс. цена" />
    </div>

    <!-- Список репетиторов -->
    <div class="tutors-list">
      <TutorCard
        v-for="tutor in filteredTutors"
        :key="tutor.id"
        :tutor="tutor"
        @click="goToTutor(tutor.id)"
      />
    </div>
  </div>
</template>

<script>
import TutorCard from '../components/TutorCard.vue'
import { tutors } from '../mock-data.js'

export default {
  components: { TutorCard },
  data () {
    return {
      tutors,
      searchQuery: '',
      selectedSubject: '',
      maxPrice: null,
      subjects: ['Математика', 'Физика', 'Химия', 'Английский', 'Программирование']
    }
  },
  computed: {
    filteredTutors () {
      return this.tutors.filter(tutor => {
        const matchesSearch = tutor.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesSubject = !this.selectedSubject || tutor.subject === this.selectedSubject
        const matchesPrice = !this.maxPrice || tutor.price <= this.maxPrice
        return matchesSearch && matchesSubject && matchesPrice
      })
    }
  },
  methods: {
    goToTutor (id) {
      this.$router.push(`/tutor/${id}`)
    }
  }
}
</script>

<style scoped>
.filters {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}
.tutors-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
