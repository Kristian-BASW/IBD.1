<script setup>
import { resolveAssetUrl } from '@slidev/client'

</script>

<template>
  <div
    class="slidev-layout cover-layout"
    :style="{
      '--logo-anim-scale':
        $frontmatter.logoAnimationDuration !== undefined
          ? $frontmatter.logoAnimationDuration / 3100
          : 1,
    }"
  >
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

    <div class="logo-delay-content">
      <div class="cover-content">
        <slot />
      </div>
    </div>

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
