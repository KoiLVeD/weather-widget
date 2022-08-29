<script setup lang="ts">
import { Location } from "@/types";
type Props = {
  location: Location;
};

import { computed, toRefs, defineProps } from "vue";

let props = defineProps<Props>();
const { location } = toRefs(props);

const weather = computed(() => {
  return location.value.weather[0];
});

const pathImage = computed(() => {
  return `https://openweathermap.org/img/wn/${location.value.weather[0].icon}@2x.png`;
});

const roundTemp = (temp: number): number => {
  return Math.round(temp);
};

const visibility = computed(() => {
  return `${location.value.visibility / 1000}km`;
});

const CONSTANT_A = 17.27;
const CONSTANT_B = 237.7;
const calcDewPoint = computed(() => {
  const temp = location.value.main.temp;
  const humidity = location.value.main.humidity;
  const result =
    (CONSTANT_A * temp) / (CONSTANT_B + temp) + Math.log(humidity / 100);
  const up = CONSTANT_B * result;
  const down = CONSTANT_A - result;
  return Math.round(up / down);
});
</script>

<template>
  <div class="weather-item">
    <div class="weather-item__name">
      {{ location.name }}, {{ location.sys.country }}
    </div>
    <div class="weather-item__visualization">
      <div class="weather-item__visualization-icon">
        <img :src="pathImage" :alt="weather.description" />
      </div>
      <div class="weather-item__visualization-temp">
        {{ roundTemp(location.main.temp) }}°C
      </div>
    </div>
    <div class="weather-item__desc">
      Feels like {{ roundTemp(location.main.feels_like) }},
      {{ weather.description }}.
    </div>
    <div class="weather-item__options">
      <div class="weather-item__option-item">{{ location.wind.speed }}m/s</div>
      <div class="weather-item__option-item">
        {{ location.main.pressure }}hPa
      </div>
      <div class="weather-item__option-item">
        Humidity: {{ location.main.humidity }}%
      </div>
      <div class="weather-item__option-item">
        Dew point: {{ calcDewPoint }}°C
      </div>
      <div class="weather-item__option-item">Visibility: {{ visibility }}</div>
    </div>
  </div>
</template>
