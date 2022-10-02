<template>
<div class="content">
  <!--
   Вообще надо надробить на более мелкие компоненты:
   1. Search
   2. Settings (Format settings (конкретно select, тоже можно в отдельный компонент) + кнопочка Update)
   3. Cities list (Список + кнопочки под ним)
   -->
  <div class="search">
    <!-- Ну по хорошему это форма должна быть (дед) -->
    <input
      class="search__input"
      type="text"
      placeholder="Search..."
      v-model="searchValue"
    >
    <button
      class="search__cross"
      type="button"
      @click="searchClear"
    ></button>
    <!-- А вот была бы форма, мог бы через input type="reset" сделать
     https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset -->
  </div>
  <ul class="list"
    role="list"
  >
  <!-- У тебя же роли по умолчанию есть, зачем еще раз проставлять?  -->
    <li
      role="listitem"
      v-for="cityFiltered in citiesFiltered"
      :key="cityFiltered"
    >
      <!-- Роли -->
      <input
        type="checkbox"
        v-model="citiesSelected"
        :value="cityFiltered"
        :id="cityFiltered"
      >
      <label
        class="button"
        :for="cityFiltered"
        tabindex="0"
      >
      <!--
       Мегазабавно, что я могу сфокусироваться на лэйбле, но не могу выбрать его с клавы.
       Проблвма HTML, но все же
      -->
        {{ cityFiltered }}
      </label>
    </li>
  </ul>
  <div class="controls">
    <button
      class="button"
      type="button"
      @click="selectAll"
      :disabled="isCardsFull"
    >Select All</button>
    <button
      class="button"
      type="button"
      @click="clearAll"
      :disabled="isCardsEmpty"
    >Clear All</button>
    <!-- Кстати, было бы это вместе со списком формой, мог бы reset использовать  -->
  </div>
  <div class="settings">
    <button
      class="button"
      type="button"
      @click="update"
      :disabled="isUpdateDisabled"
    >update</button>
    <select
      class="button"
      name="units"
      v-model="unitValue"
    >
      <option
        class="controls__option"
        v-for="unit in units"
        :key="unit"
        :value="unit"
      >
        {{ unit }}
      </option>
    </select>
  </div>
  <div class="cards">
    <WeatherCard
      v-for="citySelected in citiesSelected"
      :key="citySelected"
      :city="citySelected"
      :unitValue="unitValue"
      @deleteCity="onDeleteCity"
      ref="cards"
    />
  </div>
</div>
</template>

<script>
import WeatherCard from './WeatherCard.vue'
import capitals from '../assets/capitals.json'

export default {
  name: 'WeatherCards',
  components: { WeatherCard },

  data() {
    return {
      cities: capitals,
      citiesSelected: [],
      units: ['K', '°C', '°F'],
      unitValue: '°C',
      searchValue: '',
      isUpdateDisabled: false,
    }
  },
  computed: {
    isCardsFull() {
      return this.citiesSelected.length === this.cities.length
    },
    isCardsEmpty() {
      return this.citiesSelected.length === 0
    },
    citiesFiltered() {
      return this.cities.filter(city =>
      city.slice(0, this.searchValue.length).toLowerCase() === this.searchValue.toLowerCase())
    }
  },
  methods: {
    searchClear() {
      this.searchValue = '';
    },
    selectAll() {
      /**
       * Порадовало что не просто `citiesSelected = cities`.
       * Хотя тут хороший вопрос, следует ли вообще сохранять порядок
       */
      this.cities.forEach(city => {
        if(!this.citiesSelected.includes(city)) {
          this.citiesSelected.push(city)
        }
      });
    },
    clearAll() {
      this.citiesSelected = [];
    },
    update() {
      if(!this.isUpdateDisabled && this.citiesSelected.length) {
        const millisecondsPerMinute = 60 * 1000;

        this.isUpdateDisabled = true; // Я бы скорее опустил эту строку под цикл
                                      // (тогда у тебя логика выключения и включения лежала бы в одном месте)
        this.$refs.cards.forEach((card) => {
          card.updateData();
        })
        setTimeout(() => { // Может сбрасывать этот таймаут по изменению списка активных городов?
          this.isUpdateDisabled = false;
        }, millisecondsPerMinute * 5);
      }
    },
    onDeleteCity(city) {
      /**
       * По идее сейчас под капотом 2 прохода делается (первый на indexOf, второй на splice).
       * Можно через filter, тогда в 1 проход должен уложиться. Хотя мб мне просто так привычнее.
       */
      this.citiesSelected.splice(this.citiesSelected.indexOf(city), 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  border: solid 2px var(--color-bg-lighter);
}
.list {
  grid-area: 2 / 1 / 2 / 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: auto;
  background-color: var(--color-bg);
  border-right: solid 2px var(--color-bg-lighter);
  border-bottom: solid 2px var(--color-bg-lighter);
}
.controls {
  grid-area: 3 / 1 / 3 / 1;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background-color: var(--color-bg);
  border-right: solid 2px var(--color-bg-lighter);
}
.settings {
  grid-area: 1 / 2 / 1 / 2;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background-color: var(--color-bg);
  border-bottom: solid 2px var(--color-bg-lighter);
}
.cards {
  grid-area: 2 / 2 / 4 / 2;
  align-self: start;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  max-height: 100%;
  overflow: auto;
  background-color: var(--color-bg);
}
</style>
