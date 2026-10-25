<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
}>(), {
  color: '#334155',
  width: 4,
})

const markerId = `diagram-arrow-${useId().replaceAll(':', '')}`
const markerUrl = computed(() => `url(#${markerId})`)
</script>

<template>
  <svg
    class="diagram-arrow"
    width="980"
    height="552"
    aria-hidden="true"
  >
    <defs>
      <marker
        :id="markerId"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="3"
        markerHeight="3"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" :fill="color" />
      </marker>
    </defs>

    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :stroke="color"
      :stroke-width="width"
      :marker-end="markerUrl"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<style scoped>
.diagram-arrow {
  position: absolute;
  inset: 0;
  width: 980px;
  height: 552px;
  overflow: visible;
  pointer-events: none;
}
</style>
