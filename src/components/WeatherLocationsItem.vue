<script setup lang="ts">
import { Location } from "@/types";
type Props = {
  location: Location;
  index: number;
  overIndex: number | null;
  activeIndex: number | null;
};

import { defineProps, defineEmits, toRefs, computed } from "vue";
import TheButton from "@/components/TheButton.vue";

let props = defineProps<Props>();
let emit = defineEmits(["on-drag-over", "on-drag-start"]);
const { location } = toRefs(props);

const createClass = computed(() => {
  return [
    props.overIndex === props.index ? `is-over` : "",
    props.activeIndex === props.index ? `is-active` : "",
  ].filter(Boolean);
});

const handleOnDragStart = (event: any, index: number): void => {
  emit("on-drag-start", event, index);
};

const handleOnDragOver = (): void => {
  emit("on-drag-over", props.index);
};
</script>

<template>
  <div
    class="weather-locations-item"
    :class="createClass"
    @dragover.prevent="handleOnDragOver"
  >
    <div
      class="weather-locations-item__draggable"
      draggable="true"
      @dragstart="handleOnDragStart($event, index)"
    >
      <the-button icon="burger" size="sm" is-move></the-button>
    </div>

    <div class="weather-locations-item__title">
      {{ location.name }}, {{ location.sys.country }}
    </div>
    <the-button
      icon="trash"
      size="sm"
      @click="emit('on-remove', location.id)"
    ></the-button>
  </div>
</template>

<style lang="scss"></style>
