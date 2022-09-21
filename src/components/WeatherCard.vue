<template>
  <div
    class="card"
    :class="{
      'card--loading': isCardLoading,
      'card--loaded': isCardLoaded,
    }"
  >
    <button
      type="button"
      class="card__cross"
      @click="cityCancel"
    ></button>
    <ul
      role="list"
      class="card__list"
    >
      <li
        role="listitem"
        class="card__list-item"
        v-for="city in cities"
        :key="city"
        @click="citySelection(city)"
      >
        {{ city }}
      </li>
    </ul>
    <div class="card__city">
      <div class="card__name">
        {{ cityData.name }}
      </div>
      <div class="card__data">
        <div class="card__temp">
          {{ this.tempFormat }}{{ this.unitValue }}
        </div>
        <div class="card__description">
          {{ cityData.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    cities: Array,
    unitValue: String,
  },
  data() {
    return {
      isCardLoading: false,
      isCardLoaded: false,
      cityData: {
        name: '',
        temp: 0,
        description: '',
      },
    };
  },
  computed: {
    tempFormat() {
      let tempNew;
      switch(this.unitValue) {
        case '°C': {
          tempNew = this.cityData.temp - 273.15;
          break;
        }
        case '°F': {
          tempNew = (this.cityData.temp - 273.15) * 1.8 + 32
          break;
        }
        default: {
          tempNew = this.cityData.temp;
        }
      }
      return Math.round(tempNew) 
    }
  },
  methods: {
    citySelection(city) {
      const apiKey = '6ccafd44ac9ae5d3cda1ed97f1a23f2f';

      this.cityData.name = city;
      this.isCardLoading = true;

      this.$emit('addCity', this.cityData.name);

      const axios = require('axios').default;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        )
        .then((response) => {
          this.cityData.temp = response.data.main.temp;
          this.cityData.description = response.data.weather[0].description;

          this.isCardLoading = false;
          this.isCardLoaded = true;
        });
    },
    cityCancel() {
      this.isCardLoaded = false;
      this.$emit('removeCity', this.cityData.name);
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 20rem;
  height: 20rem;
  background-color: var(--color-bg);
  border: solid 2px var(--color-bg-light);
  transition: border-color 0.3s ease;

  &:not(.card--loading, .card--loaded)::after {
    content: "+";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    z-index: 2;
    color: var(--color-primary);
    background-color: var(--color-bg);
    opacity: 1;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: var(--color-bg-lighter);
    &::after {
      opacity: 0;
    }
  }
}
.card.card--loading,
.card.card--loaded {
  .card__list {
    height: 0%;
  }
  .card__city {
    height: 100%;
  }
}
.card.card--loaded:hover {
  .card__cross {
    opacity: 1;
  }

}

.card__cross {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-lighter);
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--color-bg);
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
}

.card__list {
  height: 100%;
  overflow-y: overlay;
  transition: height 1s ease;
}

.card__list-item {
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  font-size: 2.5rem;
  line-height: 2em;
  color: var(--color-primary);
  background-color: var(--color-bg);
  cursor: pointer;

  &:hover {
    background-color: var(--color-bg-light);
  }
}

.card__city {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--color-primary);
  height: 0%;
  transition: height 1s ease;
  overflow: hidden;
  text-transform: uppercase;
}

.card__name {
  font-size: 2.5rem;
  line-height: 1em;
  transition: font-size 0.75s ease 0.5s;
}
.card__data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  row-gap: 0.5rem;
  overflow: hidden;
  transition: height 0.75s ease 0.5s;
  height: 0;
}
.card__temp {
  font-size: 3.5rem;
  line-height: 1em;
}
.card__description {
  font-size: 1rem;
  line-height: 1em;
}

.card.card--loaded {
  .card__name {
    font-size: 1.5rem;
  }
  .card__data {
    height: 6rem;
  }
}
</style>