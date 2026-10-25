<script setup>
import { resolveAssetUrl } from '@slidev/client'

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
