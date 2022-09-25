<template>
  <div
    class="card"
    :class="{ 'card--loaded' : isCardLoaded }"
  >
    <button
      class="card__cross"
      type="button"
      @click="deleteCity"
    ></button>
    <div class="card__name">
      {{ city }}
    </div>
    <div class="card__temp">
      {{ this.tempFormat }}{{ this.unitValue }}
    </div>
    <div class="card__description">
      {{ cityData.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    city: String,
    unitValue: String,
  },
  data() {
    return {
      isCardLoaded: false,
      cityData: {
        temp: 0,
        description: '',
        time: 0,
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
      return Math.round(tempNew);
    }
  },
  mounted() {
    if (sessionStorage.getItem(this.city)) {
      const storageData = JSON.parse(sessionStorage.getItem(this.city));
      const millisecondsPerMinute = 60 * 1000;

      if ((Date.now() - storageData.time) / millisecondsPerMinute > 5) {
        this.updateData();
      } else {
        this.cityData.temp = storageData.temp;
        this.cityData.description = storageData.description;

        this.isCardLoaded = true;
      }
    } else {
      this.updateData();
    }
  },
  methods: {
    deleteCity() {
      this.$emit('deleteCity', this.city);
    },
    updateData() {
      this.isCardLoaded = false;

      const apiKey = '6ccafd44ac9ae5d3cda1ed97f1a23f2f';
      const axios = require('axios').default;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`
        )
        .then((response) => {
          this.cityData.temp = response.data.main.temp;
          this.cityData.description = response.data.weather[0].description;
          this.cityData.time = Date.now();

          sessionStorage.setItem(this.city, JSON.stringify(this.cityData));
          
          this.isCardLoaded = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-light);
  border: solid 2px var(--color-bg-lighter);
  transition: all 0.3s ease;

  &:hover {
    .card__cross {
      opacity: 1;
    }
  }
}

.card__cross {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-light);
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  border-bottom: solid 2px var(--color-bg-lighter);
  border-left: solid 2px var(--color-bg-lighter);
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1.5rem;
    height: 1px;
    background-color: var(--color-primary);
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
    opacity: 1;
  }
}

.card__name {
  font-size: 2.5rem;
  height: 1.5em;
  line-height: 1.5em;
  text-transform: uppercase;
}
.card__temp {
  font-size: 3.5rem;
  height: 0;
  line-height: 1.5em;
  overflow: hidden;
}
.card__description {
  font-size: 1rem;
  height: 0;
  line-height: 1.5em;
  overflow: hidden;
  text-transform: uppercase;
}

.card--loaded {
  .card__name {
    font-size: 1.5rem;
    transition: all 1s ease 0.5s;
  }
  .card__temp {
    height: 1.5em;
    margin-top: 1rem;
    transition: all 1s ease 0.5s;
  }
  .card__description {
    height: 1.5em;
    line-height: 1.5em;
    transition: all 1s ease 0.5s;
  }
}

</style>