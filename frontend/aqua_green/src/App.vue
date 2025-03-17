<template>
  <v-container class="text-center">
    <v-img src="./assets/logo.png" alt="Vue logo" max-width="400" />
    <v-btn color="primary" @click="handleClick">Welcome to Your Vue.js App</v-btn>
    <HelloWorld msg="This is a Vuetify enhanced component" />
  </v-container>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    handleClick() {
      alert("Vuetify button clicked!");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
