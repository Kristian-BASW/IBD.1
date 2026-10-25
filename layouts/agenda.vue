<script setup>
import { resolveAssetUrl } from '@slidev/client'

const seaLogoUrl = new URL('../pictures/sea-logo.png', import.meta.url).href

const agendaImageUrl = new URL('../pictures/agenda.png', import.meta.url).href
</script>

<template>
  <div class="slidev-layout relative">
    <slot />

    <img
      :src="agendaImageUrl"
      class="agenda-right-image"
      alt="Agenda"
    />
    <img
      v-if="$frontmatter.logoPlacement === undefined || $frontmatter.logoPlacement === 'right'"
      :src="seaLogoUrl"
      class="absolute bottom-5 right-5 w-30"
      alt="Sea logo"
      style="z-index: 100;"
    />
    <img
      v-if="$frontmatter.logoPlacement === 'left'"
      :src="seaLogoUrl"
      class="absolute bottom-5 left-5 w-30"
      alt="Sea logo"
      style="z-index: 100;"
    />
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
