<script setup>
import { resolveAssetUrl } from '@slidev/client'

const seaLogoUrl = new URL('../pictures/sea-logo.png', import.meta.url).href
</script>

<template>
  <div class="slidev-layout relative">
    <slot />

    <img
      v-if="$frontmatter.image"
      :src="resolveAssetUrl($frontmatter.image)"
      :alt="$frontmatter.imageAlt || ''"
      :style="{ 
        '--right-image-height': $frontmatter.imageHeight, 
        '--right-image-bottom': $frontmatter.imageBottomPlacement,
        '--right-image-top': $frontmatter.imageTopPlacement,
        '--right-image-right': $frontmatter.imageRightPlacement
        }"
      class="right-image"
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

  .right-image {
    position: absolute; 
    right: 70px;
    top: var(--right-image-top, auto);
    bottom: var(--right-image-bottom, 10px);
    right: var(--right-image-right, 60px);
    height: var(--right-image-height, 550px);
    object-fit: contain;
    z-index: 10; 
  }


</style>
