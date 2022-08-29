<script lang="ts" setup>
import { Location } from "@/types";
type Props = {
  isLoading: boolean;
};

import { inject, Ref, defineProps } from "vue";
import WeatherItem from "@/components/WeatherItem.vue";
import TheSpinner from "@/components/TheSpinner.vue";

let props = defineProps<Props>();

const locations = inject("locations") as Ref<Location[]>;
</script>

<template>
  <div class="weather-list">
    <the-spinner v-show="props.isLoading"></the-spinner>
    <div class="weather-list__wrapper">
      <weather-item
        v-for="location in locations"
        :location="location"
        :key="location.id"
      ></weather-item>
    </div>
  </div>
</template>

<style lang="scss"></style>
