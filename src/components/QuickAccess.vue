<template>
  <section class="section-container">
    <div v-for="section in sections" :key="section.id" class="section">
      <div class="section-items">
        <img
          :src="getIconComponent(section.id)"
          alt="section"
          class="section-icon"
        />
        {{ section.name }}
      </div>
    </div>
  </section>
</template>

<script>
import bump from '@/assets/icons/bump.svg'
import notifications from '@/assets/icons/notifications.svg'
import education from '@/assets/icons/education.svg'
import achievements from '@/assets/icons/achievements.svg'

export default {
  name: 'QuickAccess',
  data() {
    return {
      sections: [
        { id: 1, name: 'Начать работу' },
        { id: 2, name: 'Уведомления' },
        { id: 3, name: 'Обучение' },
        { id: 4, name: 'Достижения' },
      ],
    }
  },
  methods: {
    getIconComponent(id) {
      switch (id) {
        case 1:
          return bump
        case 2:
          return notifications
        case 3:
          return education
        case 4:
          return achievements
        default:
          return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  grid-column: 2 / -1;
  gap: 80px;

  background-color: #56698f;

  .section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 390px;
    height: 300px;
    background-color: #ef7f1a;

    .section-items {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;

      .section-icon {
        object-fit: contain;
        max-width: 100%;
      }
    }
  }
}
</style>
