import { defineConfig } from 'vite';

// Tailwind v4's @tailwindcss/vite plugin conflicts with Slidev's internal CSS
// (Slidev's styles use @apply with UnoCSS utilities Tailwind doesn't know).
// We pre-compile style.css via @tailwindcss/cli into style.compiled.css instead.
// See package.json's tokens:build script.
export default defineConfig({});
