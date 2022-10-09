<template>
<form class="search">
  <input
    class="search__input"
    type="text"
    placeholder="Search..."
    v-model="searchValue"
    @input="s"
  >
  <button
    class="search__cross"
    type="reset"
  ></button>
</form>
</template>

<script>

export default {
  name: 'citiesSearch',
  data() {
    return {
      searchValue: '',
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
