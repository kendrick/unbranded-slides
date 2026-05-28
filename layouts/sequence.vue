<script setup lang="ts">
type Step = string | { title: string; body?: string };
defineProps<{ steps: Step[]; direction?: 'ltr' | 'ttb' }>();
</script>

<template>
  <div class="slidev-layout sequence" :class="`dir-${direction ?? 'ltr'}`">
    <ol class="steps" :style="{ '--step-count': steps.length }">
      <li v-for="(step, i) in steps" :key="i" class="step">
        <div class="marker">{{ i + 1 }}</div>
        <div class="content">
          <h3 v-if="typeof step !== 'string'" class="step-title">{{ step.title }}</h3>
          <p class="step-body">{{ typeof step === 'string' ? step : step.body }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.sequence {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-16);
}
.steps {
  display: grid;
  gap: var(--spacing-8);
  list-style: none;
  padding: 0;
  margin: 0;
}
.dir-ltr .steps {
  grid-template-columns: repeat(var(--step-count), 1fr);
}
.dir-ttb .steps {
  grid-template-columns: 1fr;
}
.step {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
.marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--spacing-10);
  height: var(--spacing-10);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border-radius: var(--radius-full);
  font-size: var(--typography-size-lg);
  font-weight: var(--typography-weight-bold);
  font-variant-numeric: tabular-nums;
}
.step-title {
  font-size: var(--typography-size-xl);
  font-weight: var(--typography-weight-semibold);
  line-height: var(--typography-leading-tight);
}
.step-body {
  font-size: var(--typography-size-base);
  color: var(--color-muted-foreground);
  line-height: var(--typography-leading-relaxed);
}
</style>
