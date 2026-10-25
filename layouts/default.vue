<script setup>
  const seaLogoUrl = new URL('../pictures/sea-logo.png', import.meta.url).href
</script>

<template>
  <div class="slidev-layout relative">
    <slot />
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
