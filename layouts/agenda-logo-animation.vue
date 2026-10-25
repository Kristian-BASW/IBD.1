<script setup>
import { resolveAssetUrl } from '@slidev/client'

const agendaImageUrl = new URL('../pictures/agenda.png', import.meta.url).href
</script>

<template>
  <div
    class="slidev-layout relative"
    :style="{
      '--logo-anim-scale':
        $frontmatter.logoAnimationDuration !== undefined
          ? $frontmatter.logoAnimationDuration / 3100
          : 1,
    }"
  >
    <div class="logo-delay-content">
      <slot />
    </div>

    <img
      :src="agendaImageUrl"
      class="agenda-right-image"
      alt="Agenda"
    />

    <div class="logo-animation-wrap">
      <div
        class="logo-animation"
        :class="{ 'logo-animation--left': $frontmatter.logoPlacement === 'left' }"
      >
        <img class="logo-bottom" src="../pictures/sea-bottom.png" alt="bottom" />
        <img class="logo-letter logo-s" src="../pictures/sea-s.png" alt="S" />
        <img class="logo-letter logo-e" src="../pictures/sea-e.png" alt="E" />
        <img class="logo-letter logo-a" src="../pictures/sea-a.png" alt="A" />
      </div>
    </div>

  </div>
</template>

<style lang="scss">

  .agenda-right-image {
    position: absolute; 
    bottom: 110px;
    right: 60px;
    height: 370px;
    object-fit: contain;
    z-index: 10; 
  }


</style>
