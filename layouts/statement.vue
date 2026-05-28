<script setup lang="ts">
defineProps<{ text: string; eyebrow?: string }>();
</script>

<template>
  <div class="slidev-layout statement">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1 class="claim">{{ text }}</h1>
  </div>
</template>

<style scoped>
.statement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-16);
  gap: var(--spacing-4);
}
.eyebrow {
  font-size: var(--typography-size-sm);
  color: var(--color-muted-foreground);
  font-weight: var(--typography-weight-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.claim {
  font-size: calc(var(--typography-size-xl) * 3);
  font-weight: var(--typography-weight-bold);
  line-height: var(--typography-leading-tight);
}
</style>
