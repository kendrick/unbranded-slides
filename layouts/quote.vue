<script setup lang="ts">
defineProps<{ text: string; attribution: string }>();
</script>

<template>
  <div class="slidev-layout quote">
    <blockquote class="text">"{{ text }}"</blockquote>
    <cite class="attribution">— {{ attribution }}</cite>
  </div>
</template>

<style scoped>
.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--spacing-16);
  gap: var(--spacing-6);
}
.text {
  font-size: calc(var(--typography-size-xl) * 2);
  font-style: italic;
  line-height: var(--typography-leading-relaxed);
  max-width: 50ch;
  font-weight: var(--typography-weight-normal);
  /* Reset Slidev's default blockquote treatment (left border + muted bg). */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
}
.attribution {
  font-size: var(--typography-size-base);
  color: var(--color-muted-foreground);
  font-style: normal;
}
</style>
