<script setup lang="ts">
type Props = {
  size?: "sm" | "lg";
};

import { computed, defineProps, toRefs, withDefaults } from "vue";

let props = withDefaults(defineProps<Props>(), { size: "lg" });

const createClass = computed(() => {
  return `the-spinner--${props.size}`;
});
</script>

<template>
  <div class="the-spinner" :class="createClass"></div>
</template>
