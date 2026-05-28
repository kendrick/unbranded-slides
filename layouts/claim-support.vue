<script setup lang="ts">
defineProps<{ heading: string; support?: string[] }>();
</script>

<template>
  <div class="slidev-layout claim-support">
    <h1 class="heading">{{ heading }}</h1>
    <div class="support">
      <ul v-if="support" class="support-list">
        <li v-for="(item, i) in support" :key="i">{{ item }}</li>
      </ul>
      <slot v-else />
    </div>
  </div>
</template>

<style scoped>
.claim-support {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-16);
  gap: var(--spacing-8);
}
.heading {
  font-size: calc(var(--typography-size-xl) * 2.5);
  font-weight: var(--typography-weight-bold);
  line-height: var(--typography-leading-tight);
  max-width: 24ch;
}
.support {
  font-size: var(--typography-size-lg);
  color: var(--color-muted-foreground);
  max-width: 60ch;
}
.support-list {
  list-style: disc;
  padding-left: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}
.support-list li {
  line-height: var(--typography-leading-relaxed);
}
</style>
