---
source: https://tailwindcss.com/docs/installation/framework-guides/sveltekit
---

# Tailwind CSS Setup Steps for SvelteKit

Install-only variant: the commands, Vite plugin config, CSS entry, and layout import needed to enable Tailwind CSS in SvelteKit (no demo markup).

```shell
npx sv create my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
});
```

```css
/* ./src/app.css */
@import "tailwindcss";
```

```svelte
<!-- ./src/routes/+layout.svelte -->
<script>
  let { children } = $props();
  import "../app.css";
</script>

{@render children()}
```

## Notes

- Role split: this page is the setup steps only; `sveltekit.md` is the full v4 walkthrough including the `npm run dev` run step, demo markup, and the `<style>` block with `@reference`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/sveltekit.tsx` (fetched 2026-10-16).
