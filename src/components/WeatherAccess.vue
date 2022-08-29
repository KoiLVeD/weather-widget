<script setup lang="ts">
import { defineEmits } from "vue";
import TheButton from "@/components/TheButton.vue";

let emit = defineEmits(["on-add"]);
</script>

<template>
  <div class="weather-access">
    <div class="weather-access__notify">
      <div class="weather-access__notify-text">
        You restricted access to geolocation
      </div>
      <the-button class="weather-access__notify-btn" @click="emit('on-add')">
        Add location
      </the-button>
    </div>
  </div>
</template>
