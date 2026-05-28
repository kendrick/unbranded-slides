<script setup lang="ts">
defineProps<{ value: string | number; label: string; delta?: string }>();
</script>

<template>
  <div class="slidev-layout metric">
    <p class="value">{{ value }}</p>
    <p class="label">{{ label }}</p>
    <p v-if="delta" class="delta">{{ delta }}</p>
  </div>
</template>

<style scoped>
.metric {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--spacing-16);
  gap: var(--spacing-3);
}
.value {
  font-size: calc(var(--typography-size-xl) * 6);
  font-weight: var(--typography-weight-bold);
  line-height: var(--typography-leading-tight);
  font-variant-numeric: tabular-nums;
}
.label {
  font-size: var(--typography-size-lg);
  color: var(--color-muted-foreground);
  max-width: 40ch;
}
.delta {
  font-size: var(--typography-size-base);
  color: var(--color-muted-foreground);
  margin-top: var(--spacing-2);
}
</style>
