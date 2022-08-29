<script lang="ts" setup>
import { Location } from "@/types";

import { inject, ref, Ref } from "vue";
import { setItemByMemory } from "@/utils";
import WeatherLocationsItem from "@/components/WeatherLocationsItem.vue";

const locations = inject("locations") as Ref<Location[]>;

const onRemove = (id: number): void => {
  const index = locations.value.findIndex((location) => location.id === id);
  locations.value.splice(index, 1);
  setItemByMemory(
    "locations",
    locations.value.map((location) => location.name)
  );
};

let activeIndex = ref<number | null>(null);
let overIndex = ref<number | null>(null);
let currentLocation: Location | null = null;

const handleOnDragStart = (event: any, index: number): void => {
  activeIndex.value = index;
  if (activeIndex.value != null) {
    currentLocation = locations.value[activeIndex.value];
  }

  const target = event.target.closest(".weather-locations-item");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", target);
  event.dataTransfer.setDragImage(target, 24, 24);
};

const handleOnDragOver = (index: number): void => {
  if (currentLocation === locations.value[index]) {
    overIndex.value = null;
    return;
  }
  overIndex.value = index;
};

const handleOnDrop = (newPositionIndex: number): void => {
  if (activeIndex.value !== null) {
    [locations.value[activeIndex.value], locations.value[newPositionIndex]] = [
      locations.value[newPositionIndex],
      locations.value[activeIndex.value],
    ];
  }
};

const handleOnDragEnd = (): void => {
  activeIndex.value = null;
  overIndex.value = null;
};
</script>

<template>
  <div class="weather-locations-list">
    <weather-locations-item
      v-for="(location, index) in locations"
      :key="location.id"
      :index="index"
      :over-index="overIndex"
      :active-index="activeIndex"
      :location="location"
      @on-remove="onRemove"
      @on-drag-start="handleOnDragStart"
      @on-drag-over="handleOnDragOver"
      @dragend.stop="handleOnDragEnd"
      @drop="handleOnDrop(index)"
    ></weather-locations-item>
  </div>
</template>
