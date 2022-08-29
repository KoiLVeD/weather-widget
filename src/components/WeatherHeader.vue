<script setup lang="ts">
import { HeaderState, HeaderStateDictionary } from "@/types";
type Props = {
  state: HeaderState;
};

import { defineProps, defineEmits } from "vue";
import TheButton from "@/components/TheButton.vue";

const STATE: HeaderStateDictionary = {
  view: {
    title: "Widget",
    icon: "settings",
  },
  settings: {
    title: "Settings",
    icon: "close",
  },
};

let props = defineProps<Props>();
let emit = defineEmits(["toggle-state"]);

const toggleState = (): void => {
  emit("toggle-state");
};
</script>

<template>
  <div class="weather-header">
    <div class="weather-header__title">{{ STATE[props.state].title }}</div>
    <div class="weather-header__control">
      <the-button
        :icon="STATE[props.state].icon"
        @click="toggleState"
      ></the-button>
    </div>
  </div>
</template>

<style lang="scss"></style>
