<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $frontmatter: frontmatter } = useSlideContext()
</script>

<template>
  <div
    class="slidev-layout relative"
    :style="{
      '--logo-anim-scale':
        frontmatter.logoAnimationDuration !== undefined
          ? frontmatter.logoAnimationDuration / 3100
          : 1,
    }"
  >
    <div class="logo-delay-content">
      <slot />
    </div>

    <div class="logo-animation-wrap">
      <div
        class="logo-animation"
        :class="{ 'logo-animation--left': frontmatter.logoPlacement === 'left' }"
      >
        <img class="logo-bottom" src="../pictures/sea-bottom.png" alt="bottom" />
        <img class="logo-letter logo-s" src="../pictures/sea-s.png" alt="S" />
        <img class="logo-letter logo-e" src="../pictures/sea-e.png" alt="E" />
        <img class="logo-letter logo-a" src="../pictures/sea-a.png" alt="A" />
      </div>
    </div>

  </div>
</template>
