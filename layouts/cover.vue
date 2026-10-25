<script setup>
import { resolveAssetUrl } from '@slidev/client'

const seaLogoUrl = new URL('../pictures/sea-logo.png', import.meta.url).href
</script>

<template>
  <div class="slidev-layout cover-layout">
    <img
      v-if="$frontmatter.background"
      :src="resolveAssetUrl($frontmatter.background)"
      class="cover-bg"
      :style="{
        '--cover-bg-fit': $frontmatter.backgroundFit ?? 'cover',
        '--cover-bg-position': $frontmatter.backgroundPosition ?? 'center',
        '--cover-bg-scale': $frontmatter.backgroundScale ?? 1,
      }"
      alt=""
    />
    <img
      v-if="$frontmatter.logoPlacement === undefined || $frontmatter.logoPlacement === 'right'"
      :src="seaLogoUrl"
      class="absolute bottom-5 right-5 w-30"
      alt="Sea logo"
      style="z-index: 2;"
    />
    <img
      v-if="$frontmatter.logoPlacement === 'left'"
      :src="seaLogoUrl"
      class="absolute bottom-5 left-5 w-30"
      alt="Sea logo"
      style="z-index: 2;"
    />
    <div class="cover-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.cover-layout {
  position: relative;
  overflow: hidden;
  padding: 0;
}

.cover-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: var(--cover-bg-fit, cover);
  object-position: var(--cover-bg-position, center);
  transform: scale(var(--cover-bg-scale, 1));
  transform-origin: center;
  z-index: 0;
}

.cover-content {
  position: relative;
  z-index: 1;
  padding: 2.5rem 3.5rem;
}
</style>
