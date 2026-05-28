<script setup lang="ts">
// `title` is reserved by Slidev's frontmatter (used for navigation/overview),
// so we use `label` here to avoid the collision.
defineProps<{ label: string; index?: string }>();
</script>

<template>
  <div class="slidev-layout divider">
    <p v-if="index" class="index">{{ index }}</p>
    <h1 class="title">{{ label }}</h1>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-16);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  gap: var(--spacing-4);
}
.index {
  font-size: var(--typography-size-lg);
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
  font-weight: var(--typography-weight-medium);
  letter-spacing: 0.08em;
}
.title {
  font-size: calc(var(--typography-size-xl) * 3);
  font-weight: var(--typography-weight-bold);
  line-height: var(--typography-leading-tight);
}
</style>
