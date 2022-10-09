<template>
<form
  class="search"
  @submit.prevent="addCity"
>
  <input
    class="search__input"
    type="text"
    placeholder="Search..."
    v-model="searchValue"
    :disabled="!isSearchReady"
  >
  <button
    class="search__clear"
    type="reset"
    :disabled="!isSearchReady"
  ></button>
  <span
    class="search__wait"
    :class="{ 'active' : !isSearchReady }"
  >
    <span>wait</span>
  </span>
</form>
</template>

<script>
export default {
  name: 'citiesSearch',
  props: {
    isSearchReady: Boolean,
  },
  data() {
    return {
      searchValue: '',
    }
  },
  methods: {
    addCity() {
      if(this.searchValue) {
        this.$emit('addCity', this.searchValue);
        this.searchValue = '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.search {
  grid-area: 1 / 1 / 1 / 1;
  padding: 1rem;
  display: grid;
  position: relative;
  grid-template-columns: 1fr auto;
  background-color: var(--color-bg);
  border-right: solid 2px var(--color-bg-lighter);
  border-bottom: solid 2px var(--color-bg-lighter);
  &__input {
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
  &__clear {
    width: 5.5rem;
    height: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-light);
    border: solid 2px var(--color-bg-lighter);
    color: var(--color-primary);
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
  &__wait {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    line-height: 1.5em;
    color: var(--color-primary);
    background-color: var(--color-bg);
    text-transform: uppercase;
    transition: opacity 0.3s ease;
    user-select: none;
    opacity: 0;
    pointer-events: none;
    span {
      position: relative;
    }
    span::after {
      content: "";
      position: absolute;
      top: 0;
      left: 100%;
      animation-name: wait-dots;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
  @keyframes wait-dots {
    0% {
      content: "";
    }
    25% {
      content: ".";
    }
    50% {
      content: "..";
    }
    75% {
      content: "...";
    }
  }
} 
</style>
