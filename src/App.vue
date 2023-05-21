<script setup>
import SpaceHeader from './components/SpaceHeader.vue'
import SignupForm from './components/SignUpForm.vue'
</script>

<template>
  <SpaceHeader />
  <main>
    <SignupForm />
  </main>
</template>

<style>
body {
  background-color: #f7f8fc;
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
