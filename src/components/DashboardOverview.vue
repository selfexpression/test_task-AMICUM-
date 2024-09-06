<template>
  <section class="dashboard-container">
    <div class="dashboard-header">
      <div class="date-container">
        <span>18.07.2022</span>
        <span>10:06</span>
      </div>
      <div class="exit">
        <span>Выход</span>
        <img src="@/assets/icons/logout.svg" alt="logout" />
      </div>
    </div>
    <div class="theme-toggler"></div>
    <div class="personal-info">
      <h3 class="name">Моисеев Михаил Сергеевич</h3>
      <p class="date-of-birth">13.08.1980</p>
      <p>Таб №: ГОКИ 0000</p>
      <p>
        Электрослесарь (слесарь дежурный и по ремонту оборудования) I разряда
      </p>
    </div>
    <div class="dashboard-info">
      <div v-for="item in infoItems" class="dashboard-item" :key="item.id">
        <img
          v-if="!item.isInteractive"
          :src="getIconComponent(item.id)"
          alt="dashboard-icon"
          class="dashboard-icon"
        />
        <p v-else>{{ getInteractiveInfo(item.id) }}</p>
        {{ item.name }}
      </div>
    </div>
  </section>
</template>

<script>
import notebook from '@/assets/icons/notebook.svg'
import exam from '@/assets/icons/exam.svg'

export default {
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
  methods: {
    getIconComponent(id) {
      switch (id) {
        case 1:
          return notebook
        case 2:
          return exam
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
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  grid-column: 1 / 2;
  background-color: #353d54;

  .dashboard-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .dashboard-item {
      height: 260px;
      flex-basis: calc(281px - 80px);
    }
  }
}
</style>
