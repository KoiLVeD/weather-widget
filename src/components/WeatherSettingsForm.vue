<script lang="ts" setup>
import { Location, LocationError } from "@/types";

import { inject, ref, Ref, onMounted } from "vue";
import { getWeatherByLocation } from "@/api/widget";
import { setItemByMemory } from "@/utils";
import { AxiosResponse } from "axios";
import TheButton from "@/components/TheButton.vue";

const locations = inject("locations") as Ref<Location[]>;
let searchValue = ref<string>("");
let errorMessage = ref<string>("");
let idTimer = ref<number>(0);
let searchInput = ref<null | HTMLInputElement>(null);
let isLoading = ref<boolean>(false);

const setErrorMessage = (message: string): void => {
  clearTimeout(idTimer.value);
  errorMessage.value = message;
  idTimer.value = setTimeout(() => {
    errorMessage.value = "";
  }, 2000);
};

const add = (): void => {
  const isEmpty = searchValue.value.length === 0;
  const isRepeat = locations.value.some(
    (location) =>
      location.name.toLowerCase() === searchValue.value.toLowerCase()
  );
  if (isRepeat) return setErrorMessage("already exists");
  if (isEmpty) return setErrorMessage("empty field");

  isLoading.value = true;

  getWeatherByLocation(searchValue.value)
    .then((response: AxiosResponse<Location>) => {
      const { data } = response;
      locations.value.push(data);
      setItemByMemory(
        "locations",
        locations.value.map((location) => location.name)
      );
      searchValue.value = "";
    })
    .catch((response: AxiosResponse<LocationError>) => {
      const { data } = response;
      if (data) {
        setErrorMessage(data.message);
        searchValue.value = "";
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
});
</script>

<template>
  <div class="weather-settings-from" @keyup.enter="add">
    <div class="weather-settings-from__field">
      <label for="location" class="weather-settings-from__label">
        Add Locations
      </label>
      <input
        ref="searchInput"
        v-model="searchValue"
        placeholder="Enter..."
        id="location"
        type="text"
        class="weather-settings-from__input"
      />
      <div v-show="errorMessage" class="weather-settings-from__error">
        {{ errorMessage }}
      </div>
    </div>
    <div class="weather-settings-from__control">
      <the-button
        icon="plus"
        size="sm"
        @click="add"
        :is-loading="isLoading"
      ></the-button>
    </div>
  </div>
</template>
