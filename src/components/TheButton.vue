<script setup lang="ts">
type Props = {
  size?: "sm" | "md" | "lg";
  icon?: string;
  isMove?: boolean;
  isLoading?: boolean;
};

import { computed, defineProps, withDefaults } from "vue";
import TheSpinner from "@/components/TheSpinner.vue";

let props = withDefaults(defineProps<Props>(), { size: "md" });

const pathIcon = computed(() => {
  return `/static/icons/${props.icon}.svg`;
});

const createClass = computed(() => {
  return [
    props.size ? `the-button--${props.size}` : "",
    props.isLoading ? `the-button--loading` : "",
    props.isMove ? `the-button--move` : "",
    !props.icon ? `the-button--text` : "",
  ].filter(Boolean);
});
</script>

<template>
  <button class="the-button" :class="createClass">
    <img v-if="icon" class="the-button__icon" :src="pathIcon" alt="" />
    <the-spinner v-if="props.isLoading" size="sm"></the-spinner>
    <slot></slot>
  </button>
</template>
