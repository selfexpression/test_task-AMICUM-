<template>
  <section class="options-container">
    <div class="logo">
      <img src="@/assets/icons/logo.svg" alt="logo" />
    </div>
    <div class="options-wrapper">
      <div v-for="option in options" :key="option.id" class="options">
        <div v-if="option.id === 2" class="notification-count">2</div>
        <div class="option-item">
          <img
            :src="getOptionIcon(option.id)"
            alt="option"
            class="option-icon"
          />
          <span class="option-name">
            {{ option.name }}
          </span>
        </div>
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
      options: [
        { id: 1, name: 'Начать работу' },
        { id: 2, name: 'Уведомления' },
        { id: 3, name: 'Обучение' },
        { id: 4, name: 'Достижения' },
      ],
    }
  },
  methods: {
    getOptionIcon(id) {
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
.options-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  grid-column: 2 / -1;
  gap: 80px;
  margin: 0 15px;
  padding-bottom: 130px;

  background-color: #56698f;

  .logo {
    position: absolute;
    top: 20px;
    right: 5px;
  }

  .options-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 80px;

    .options {
      position: relative;
      width: 390px;
      height: 300px;
      background-color: #ef7f1a;
      border-radius: 5px;
      box-shadow: 0px 4px 4px 1px #00000033;

      .notification-count {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        top: -20px;
        right: -20px;
        background-color: #acd91b;
        font-size: 32px;
        font-weight: 600;
        color: black;
      }

      .option-item {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: 1fr;
        justify-items: center;
        align-items: center;
        height: 100%;
        padding: 20px 0;
        cursor: pointer;

        .option-icon {
          object-fit: contain;
          grid-row: 2 / -1;
        }

        .option-name {
          font-size: 36px;
          font-weight: 600;
          white-space: nowrap;
          grid-row: 1 / 2;
        }
      }
    }
  }
}
</style>
