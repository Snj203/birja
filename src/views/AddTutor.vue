<template>
  <div class="add-tutor">
    <h1>Добавить репетитора</h1>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Имя" required />
      <input v-model="form.subject" placeholder="Предмет" required />
      <textarea v-model="form.description" placeholder="Описание" required />
      <input v-model="form.price" type="number" placeholder="Цена" required />
      <input v-model="form.contact" placeholder="Контакты" required />
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script>
import { tutors } from '../mock-data.js'

export default {
  data () {
    return {
      form: {
        name: '',
        subject: '',
        description: '',
        price: null,
        contact: ''
      }
    }
  },
  methods: {
    submitForm () {
      const newTutor = {
        id: tutors.length + 1,
        ...this.form,
        rating: 5
      }
      tutors.push(newTutor)
      alert('Репетитор добавлен!')
      this.$router.push('/')
    }
  }
}
</script>
