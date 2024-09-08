<template>
  <section :class="['dashboard-container', theme]">
    <div class="dashboard-header">
      <div :class="['date-wrapper', theme]">
        <span>{{ currentDate }}</span>
        <span>{{ currentTime }}</span>
      </div>
      <router-link to="/login">
        <button
          type="button"
          :class="['logout-button', theme]"
          aria-label="logout_button"
        >
          <span>Выход</span>
          <LogoutIcon :class="['logout-icon', theme]" />
        </button>
      </router-link>
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
            <svg width="100%" height="100%" viewBox="0 0 145 145">
              <circle
                cx="72.5"
                cy="72.5"
                r="60"
                stroke="#353D54"
                stroke-width="10"
                fill="none"
              />
              <circle
                cx="72.5"
                cy="72.5"
                r="60"
                :stroke="getDiagramColor(item.id)"
                stroke-width="10"
                fill="none"
                stroke-dasharray="377"
                :stroke-dashoffset="getFillPercentage(item.id)"
                stroke-linecap="round"
                transform="rotate(-90 72.5 72.5)"
              />
            </svg>
            <component
              v-if="!item.isInteractive"
              :is="getIconComponent(item.id)"
              alt="dashboard_option_icon"
              class="dashboard-option-icon"
            />
            <p v-else :class="item.id === 3 ? 'testing' : 'certification'">
              {{ getInteractiveInfo(item.id) }}
              <span v-if="item.id === 4">{{
                getNoun(getInteractiveInfo(item.id), 'день', 'дней', 'дня')
              }}</span>
            </p>
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { getNoun } from '@/shared/utils'

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
      certification: (state) => state.certification,
      testResults: (state) => state.testResults,
      preShiftTraining: (state) => state.preShiftTraining,
      briefing: (state) => state.briefing,
    }),
  },
  methods: {
    ...mapMutations({
      changeTheme: 'setTheme',
    }),
    ...mapActions([
      'startTimer',
      'stopTimer',
      'updateCurrentDateAndTime',
      'loadPersonalData',
    ]),
    ...mapGetters([
      'daysLeft',
      'testCompletionPercentage',
      'certificationDatePercentage',
    ]),
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
    getDiagramColor(id) {
      switch (id) {
        case 1:
          return this.getPreShiftAndBriefingColor(this.briefing)
        case 2:
          return this.getPreShiftAndBriefingColor(this.preShiftTraining)
        case 3:
          return '#ACD91B'
        case 4:
          return this.getCertificationColor(this.daysLeft())
        default:
          return null
      }
    },
    getPreShiftAndBriefingColor(param) {
      switch (param) {
        case null:
          return '#353D54'
        case false:
          return '#EF7F1A'
        case true:
          return '#B2D63C'
        default:
          return '#353D54'
      }
    },
    getCertificationColor(days) {
      return days < 30 ? '#EF7F1A' : '#B2D63C'
    },
    getFillPercentage(id) {
      const dasharray = 377

      switch (id) {
        case 1:
        case 2:
          return 0
        case 3: {
          return dasharray * (1 - this.testCompletionPercentage() / 100)
        }
        case 4: {
          return dasharray * (1 - this.certificationDatePercentage() / 100)
        }
      }
    },
    getInteractiveInfo(id) {
      switch (id) {
        case 3:
          return this.testResults.completedTests
        case 4:
          return this.daysLeft()
        default:
          return null
      }
    },
    getNoun,
  },
  created() {
    this.updateCurrentDateAndTime()
    this.startTimer()
    this.loadPersonalData()
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
      justify-content: flex-end;
      gap: 10px;
      width: max-content;
      font-size: 24px;
      font-weight: 600;
      background-color: transparent;
      border: none;
      cursor: pointer;

      .logout-icon {
        width: 20%;
      }

      &.dark {
        color: #f2f2f2;
      }

      &.light {
        color: #586c92;
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
        display: grid;
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
        text-align: center;
        height: 260px;
        width: 281px;
        font-size: 20px;
        font-weight: 700;
        background-color: #56698f;
        border-radius: 5px;
        box-shadow: 0px 4px 4px 1px #00000033;

        .diagram-option {
          position: relative;
          display: inline-grid;
          place-content: center;
          width: 145px;
          aspect-ratio: 1;
          font-weight: 600;
          grid-row: 2;

          .dashboard-option-icon,
          p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .testing,
          .certification {
            margin: 0;
          }

          .testing {
            font-size: 45px;
          }

          .certification {
            display: flex;
            flex-direction: column;
            font-size: 40px;

            span {
              font-size: 20px;
              font-weight: 700;
            }
          }

          .dashboard-option-icon {
            width: 50%;
            margin-left: 5px;
          }
        }

        .option-name {
          max-width: 60%;
          align-self: flex-end;
          grid-row: 1;
          word-break: break-word;
        }
      }
    }
  }
}

@media screen and (min-width: 3840px) {
  .dashboard-container {
    padding: 40px 50px;

    .dashboard-header {
      .date-wrapper,
      .logout-button {
        font-size: 56px;

        .logout-icon {
          width: 30%;
        }
      }
    }

    .theme-toggler {
      width: 120px;
      height: 40px;

      .theme-toggler-icon {
        width: 80%;
      }
    }

    .dashboard-info {
      gap: 60px;

      .personal-data {
        gap: 20px;

        .name {
          font-size: 72px;
        }

        .date-of-birth {
          font-size: 46px;
        }

        .other-info {
          font-size: 36px;
        }
      }

      .personal-info {
        gap: 35px;

        .dashboard-option {
          width: 100%;
          height: 100%;
          aspect-ratio: 1;
          font-size: 36px;

          .diagram-option {
            width: 360px;

            .dashboard-option-icon {
              width: 40%;
            }

            .testing {
              font-size: 56px;
            }

            .certification {
              font-size: 50px;

              span {
                font-size: 32px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1280px) and (max-width: 1919px) {
  .dashboard-container {
    padding: 15px 20px;

    .dashboard-header {
      .date-wrapper,
      .logout-button {
        font-size: 14px;

        .logout-icon {
          width: 10%;
        }
      }
    }

    .theme-toggler {
      width: 35px;
      height: 10px;

      .theme-toggler-icon {
        width: 60%;
      }
    }

    .dashboard-info {
      gap: 20px;

      .personal-data {
        gap: 7px;

        .name {
          font-size: 18px;
        }

        .date-of-birth {
          font-size: 16px;
        }

        .other-info {
          font-size: 14px;
        }
      }

      .personal-info {
        gap: 10px;

        .dashboard-option {
          width: 100%;
          height: 100%;
          aspect-ratio: 1;
          font-size: 14px;

          .diagram-option {
            width: 90px;

            .dashboard-option-icon {
              width: 40%;
              margin-left: 2px;
            }

            .testing {
              font-size: 24px;
            }

            .certification {
              font-size: 20px;

              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
