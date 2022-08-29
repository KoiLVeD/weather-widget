<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  styles: [`/* inlined css */`],
});
</script>

<script setup lang="ts">
import { HeaderState, Location } from "@/types";

import { onBeforeMount, ref, provide } from "vue";
import { AxiosResponse } from "axios";
import { setItemByMemory, getItemByMemory } from "@/utils";
import { getWeatherByCoordinates, getWeatherByLocation } from "@/api/widget";
import WeatherList from "@/components/WeatherList.vue";
import WeatherSettings from "@/components/WeatherSettings.vue";
import WeatherHeader from "@/components/WeatherHeader.vue";
import WeatherAccess from "@/components/WeatherAccess.vue";

let locations = ref<Location[]>([]);
provide("locations", locations);

let isLoading = ref<boolean>(true);
let isError = ref<boolean>(false);

const getLocationsFromMemory = (): boolean => {
  const list = getItemByMemory("locations");
  if (list.length > 0) {
    const requestsLocations = list.map((location) =>
      getWeatherByLocation(location)
    );
    Promise.all(requestsLocations).then((response) => {
      locations.value = response.map((value) => value.data);
      isLoading.value = false;
    });
    return true;
  } else {
    return false;
  }
};

const getLocationsFromApi = (): void => {
  const id = navigator.geolocation.watchPosition(
    (response) => {
      const { latitude, longitude } = response.coords;
      getWeatherByCoordinates(latitude, longitude).then(
        (response: AxiosResponse<Location>) => {
          const { data } = response;
          locations.value.push(data);
          setItemByMemory("locations", [data.name]);
          isLoading.value = false;
          navigator.geolocation.clearWatch(id);
        }
      );
    },
    (positionError) => {
      if (positionError) {
        isError.value = true;
        isLoading.value = false;
      }
    }
  );
};

let currentState = ref<HeaderState>("view");
const toggleState = (): void => {
  currentState.value = currentState.value === "view" ? "settings" : "view";
};

const showSettings = (): void => {
  isError.value = false;
  toggleState();
};

onBeforeMount((): void => {
  const isMemory = getLocationsFromMemory();
  if (!isMemory) {
    getLocationsFromApi();
  }
});
</script>

<template>
  <div class="weather">
    <weather-header
      @toggle-state="toggleState"
      :state="currentState"
    ></weather-header>

    <weather-list
      v-show="currentState === 'view'"
      :is-loading="isLoading"
    ></weather-list>

    <weather-settings v-if="currentState === 'settings'"></weather-settings>

    <weather-access v-if="isError" @on-add="showSettings"></weather-access>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/widget.scss";
</style>
