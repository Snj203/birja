<template>
  <div v-if="tutor" class="tutor-details">
    <h1>{{ tutor.name }}</h1>
    <p><strong>Предмет:</strong> {{ tutor.subject }}</p>
    <p><strong>Описание:</strong> {{ tutor.description }}</p>
    <p><strong>Цена:</strong> {{ tutor.price }} ₽/час</p>
    <p><strong>Контакты:</strong> {{ tutor.contact }}</p>
    <button @click="$router.go(-1)">Назад</button>
  </div>
  <div v-else>
    <p>Репетитор не найден</p>
  </div>
</template>

<script>
import { tutors } from '../mock-data.js'

export default {
  props: ['id'],
  computed: {
    tutor () {
      return tutors.find(t => t.id === parseInt(this.id))
    }
  }
}
</script>
