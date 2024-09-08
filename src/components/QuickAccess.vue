<template>
  <section class="options-container">
    <div class="logo">
      <Logo />
    </div>
    <div class="options-wrapper">
      <div v-for="option in options" :key="option.id" class="option">
        <div
          v-if="option.id === 2 && !!notifications"
          class="notification-count"
        >
          {{ notifications }}
        </div>
        <div class="option-item">
          <component
            :is="getOptionIcon(option.id)"
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
import Logo from '@/assets/icons/logo.svg'
import Bump from '@/assets/icons/bump.svg'
import Notifications from '@/assets/icons/notifications.svg'
import Education from '@/assets/icons/education.svg'
import Achievements from '@/assets/icons/achievements.svg'
import { mapState } from 'vuex'

export default {
  name: 'QuickAccess',
  components: {
    Logo,
    Bump,
    Notifications,
    Education,
    Achievements,
  },
  computed: {
    ...mapState({
      notifications: (state) => state.notifications,
    }),
  },
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
          return 'Bump'
        case 2:
          return 'Notifications'
        case 3:
          return 'Education'
        case 4:
          return 'Achievements'
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

    .option {
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
          width: 40%;
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

@media screen and (min-width: 2560px) and (max-width: 3840px) {
  .options-container {
    .options-wrapper {
      width: 60%;
      gap: 200px;

      .option {
        width: 100%;
        height: 100%;
        aspect-ratio: 13 / 10;

        .notification-count {
          width: 80px;
          height: 80px;
          font-size: 44px;
          top: -30px;
          right: -30px;
        }

        .option-item {
          .option-icon {
            width: 40%;
          }

          .option-name {
            font-size: 72px;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1280px) and (max-width: 1919px) {
  .options-container {
    padding-bottom: 60px;

    .options-wrapper {
      gap: 20px;

      .option {
        width: 100%;
        height: 100%;
        aspect-ratio: 13 / 10;

        .notification-count {
          width: 40px;
          height: 40px;
          font-size: 24px;
          top: -10px;
          right: -10px;
        }

        .option-item {
          .option-icon {
            width: 30%;
          }

          .option-name {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
