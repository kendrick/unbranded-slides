import { defineAppSetup } from '@slidev/types';
import '../style.compiled.css';

export default defineAppSetup(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});
