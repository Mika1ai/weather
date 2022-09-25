<template>
<div class="content">
  <div class="search">
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
  </div>
  <ul class="list"
    role="list"
  >
    <li
      role="listitem"
      v-for="cityFiltered in citiesFiltered"
      :key="cityFiltered"
    >
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

        this.isUpdateDisabled = true;
        this.$refs.cards.forEach((card) => {
          card.updateData();
        })
        setTimeout(() => {
          this.isUpdateDisabled = false;
        }, millisecondsPerMinute * 5);
      }
    },
    onDeleteCity(city) {
      this.citiesSelected.splice(this.citiesSelected.indexOf(city), 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: block;
  font-size: 1.5rem;
  line-height: 1.5em;
  padding: 1em 1.5em;
  background-color: var(--color-bg-light);
  color: var(--color-primary);
  border: solid 2px var(--color-bg-lighter);
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  transition-property: background-color, border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: var(--color-bg-lighter);
  }
  &:disabled {
    background-color: var(--color-bg);
    border-color: var(--color-bg-light);
    pointer-events: none;
  }
  &:focus-visible {
    outline: solid 2px var(--color-primary);
    outline-offset: -2px;
    background-color: var(--color-bg-lighter);
  }
}
select {
  -moz-appearance:none;
  -webkit-appearance:none;
  appearance:none;
}
input[type='checkbox'] {
  display: none;

  &:checked + label {
    background-color: var(--color-bg-lighter);
  }
}

.content {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  border: solid 2px var(--color-bg-lighter);
}
.search {
  grid-area: 1 / 1 / 1 / 1;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 5.5rem;
  background-color: var(--color-bg);
  border-right: solid 2px var(--color-bg-lighter);
  border-bottom: solid 2px var(--color-bg-lighter);
  input {
    width: 100%;
    font-size: 1.5rem;
    line-height: 1.5em;
    padding: 1em 1.5em;
    background-color: var(--color-bg-light);
    color: var(--color-primary);
    border: solid 2px var(--color-bg-lighter);
    border-right: none;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--color-bg-lighter);
    }
    &:focus-visible {
      outline: solid 2px var(--color-primary);
      outline-offset: -2px;
      background-color: var(--color-bg-lighter);
    }
    &::placeholder {
      text-transform: uppercase;
      color: var(--color-primary);
    }
  }
  button {
    width: 5.625rem;
    height: 5.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-light);
    border: solid 2px var(--color-bg-lighter);
    transition: background-color 0.3s ease;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 1.5rem;
      height: 1px;
      background-color: var(--color-primary);
      transition: background-color 0.3s ease;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
    &:hover {
      background-color: var(--color-bg-lighter);
    }
    &:focus-visible {
      outline: solid 2px var(--color-primary);
      outline-offset: -2px;
      background-color: var(--color-bg-lighter);
    }
  }
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
