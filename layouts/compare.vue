<script setup lang="ts">
defineProps<{
  items: { title: string; body: string }[];
  as?: 'plain' | 'card';
}>();
</script>

<template>
  <div class="slidev-layout compare">
    <div
      class="cells"
      :class="`as-${as ?? 'plain'}`"
      :style="{ '--cell-count': items.length }"
    >
      <div v-for="(item, i) in items" :key="i" class="cell">
        <h3 class="cell-title">{{ item.title }}</h3>
        <p class="cell-body">{{ item.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-16);
}
.cells {
  display: grid;
  grid-template-columns: repeat(var(--cell-count), 1fr);
  gap: var(--spacing-8);
}
.cells.as-card .cell {
  background: var(--color-muted);
  padding: var(--spacing-8);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.cells.as-plain .cell {
  padding: 0;
  background: transparent;
}
.cell-title {
  font-size: var(--typography-size-xl);
  font-weight: var(--typography-weight-semibold);
  margin-bottom: var(--spacing-3);
  line-height: var(--typography-leading-tight);
}
.cell-body {
  font-size: var(--typography-size-base);
  color: var(--color-muted-foreground);
  line-height: var(--typography-leading-relaxed);
}
</style>
