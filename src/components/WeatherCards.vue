<template>
  <div class="cards">
    <WeatherCard
      :cities="cities"
      :unitValue="unitValue"
      @addCity="onAddCity"
      @removeCity="onRemoveCity"
    />
    <select
      class="units"
      name="units"
      v-model="unitValue"
    >
      <option
        class="unit"
        v-for="unit in units"
        :key="unit"
        :value="unit"
      >
        {{ unit }}
      </option>
    </select>
  </div>
</template>

<script>
import WeatherCard from './WeatherCard.vue'

export default {
  name: 'WeatherCards',
  components: { WeatherCard },

  data() {
    return {
      cities: ['Minsk', 'Kyiv', 'Warsaw', 'Vilnius', 'Tallinn', 'Riga', 'Prague', 'Tbilisi'],
      units: ['K', '°C', '°F'],
      unitValue: '°C'
    }
  },
  methods: {
    onAddCity(value) {
      console.log(value);
    },
    onRemoveCity(value) {
      console.log(value);
    }
  }
}
</script>

<style scoped>
.cards {
  background-color: var(--color-bg);
  padding-block: 5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.units {
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--color-bg);
  color: var(--color-primary);
}
</style>
