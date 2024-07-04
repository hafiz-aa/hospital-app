<template>
  <div>
    <nav class="bg-blue-500 p-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <router-link
            to="/"
            class="text-white text-lg font-semibold"
            >Hospital</router-link
          >
          <router-link
            to="/login"
            class="text-white"
            >Login</router-link
          >
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import "./index.css";
</style>
