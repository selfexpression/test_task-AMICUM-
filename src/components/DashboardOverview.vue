<template>
  <section :class="['dashboard-container', theme]">
    <div class="dashboard-header">
      <div :class="['date-wrapper', theme]">
        <span>{{ currentDate }}</span>
        <span>{{ currentTime }}</span>
      </div>
      <button
        type="button"
        :class="['logout-button', theme]"
        aria-label="logout_button"
      >
        <span>Выход</span>
        <LogoutIcon :class="['logout-icon', theme]" />
      </button>
    </div>
    <div @click="changeTheme()" class="theme-toggler">
      <ThemeTogglerIcon :class="['theme-toggler-icon', theme]" />
    </div>
    <div class="dashboard-info">
      <div class="personal-data">
        <h4 class="name">Моисеев Михаил Сергеевич</h4>
        <p class="date-of-birth">13.08.1980</p>
        <div class="other-info">
          <p>Таб №: ГОКИ 0000</p>
          <p>
            Электрослесарь (слесарь дежурный и по ремонту оборудования) I
            разряда
          </p>
        </div>
      </div>
      <div class="personal-info">
        <div v-for="item in infoItems" class="dashboard-option" :key="item.id">
          <div class="diagram-option">
            <component
              v-if="!item.isInteractive"
              :is="getIconComponent(item.id)"
              alt="dashboard_option_icon"
              class="dashboard-option-icon"
            />
            <p v-else>{{ getInteractiveInfo(item.id) }}</p>
          </div>
          <span class="option-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notebook from '@/assets/icons/notebook.svg'
import Exam from '@/assets/icons/exam.svg'
import LogoutIcon from '@/assets/icons/logout.svg'
import ThemeTogglerIcon from '@/assets/icons/theme_toggler.svg'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'DashboardOverview',
  components: {
    Notebook,
    Exam,
    LogoutIcon,
    ThemeTogglerIcon,
  },
  data() {
    return {
      infoItems: [
        { id: 1, name: 'Инструктаж', isInteractive: false },
        { id: 2, name: 'Предсменный экзаменатор', isInteractive: false },
        { id: 3, name: 'Тестов выполнено', isInteractive: true },
        { id: 4, name: 'Аттестация через', isInteractive: true },
      ],
    }
  },
  computed: {
    ...mapState({
      currentDate: (state) => state.currentDate,
      currentTime: (state) => state.currentTime,
      theme: (state) => state.theme,
    }),
  },
  methods: {
    ...mapMutations({
      changeTheme: 'setTheme',
    }),
    ...mapActions(['startTimer', 'stopTimer', 'updateCurrentDateAndTime']),
    getIconComponent(id) {
      switch (id) {
        case 1:
          return 'Notebook'
        case 2:
          return 'Exam'
        default:
          return null
      }
    },
    getInteractiveInfo(id) {
      switch (id) {
        case 3:
          return '122'
        case 4:
          return '1825 дней'
        default:
          return null
      }
    },
  },
  created() {
    this.updateCurrentDateAndTime()
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  grid-column: 1 / 2;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 30px 40px;
  box-shadow: 4px 0px 10px 0px #00000040;

  &.light {
    background-color: #f2f2f2;
  }

  &.dark {
    background-color: #353d54;
  }

  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    width: 100%;

    .date-wrapper {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: 700;
      font-size: 20px;

      &.dark {
        color: #f2f2f2;
      }

      &.light {
        color: #586c92;
      }
    }

    .logout-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      font-size: 24px;
      font-weight: 600;
      background-color: transparent;
      border: none;
      cursor: pointer;

      &.dark {
        color: #f2f2f2;
      }

      &.light {
        color: #353d54;
      }
    }
  }

  .theme-toggler {
    position: relative;
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-self: flex-end;
    width: 76px;
    height: 20px;
    border-radius: 10px;
    background-color: #56698f;
    cursor: pointer;

    .theme-toggler-icon {
      position: absolute;
      transition: transform 0.2s ease-in-out;

      &.dark {
        color: #e6e6e6;
        transform: translateX(-25%);
      }

      &.light {
        color: #353d54;
        transform: translateX(50%);
      }
    }
  }

  .dashboard-info {
    display: flex;
    flex-direction: column;
    gap: 50px;

    .personal-data {
      display: flex;
      flex-direction: column;
      gap: 15px;
      background-color: #586c92;
      border-radius: 5px;
      padding: 10px 20px;
      box-shadow: 0px 4px 4px 0px #00000040;

      * {
        margin: 0;
      }

      .name {
        font-size: 32px;
        font-weight: 700;
      }

      .date-of-birth {
        font-size: 24px;
        font-weight: 600;
      }

      .other-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
        font-size: 16px;
        font-weight: 600;
      }
    }

    .personal-info {
      display: grid;
      justify-items: center;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 20px;

      .dashboard-option {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;
        height: 260px;
        width: 281px;
        font-size: 20px;
        font-weight: 700;
        background-color: #56698f;
        border-radius: 5px;
        box-shadow: 0px 4px 4px 1px #00000033;

        .diagram-option {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 145px;
          height: 145px;
          border: 10px solid #b2d63c;
          border-radius: 50%;

          .dashboard-option-icon {
            margin-left: 10px;
          }
        }

        .option-name {
          word-break: break-word;
          max-width: 60%;
        }
      }
    }
  }
}
</style>
