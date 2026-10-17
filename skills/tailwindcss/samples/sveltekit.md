---
source: https://tailwindcss.com/docs/installation/framework-guides/sveltekit
---

# Install Tailwind CSS with SvelteKit

Set up Tailwind CSS v4 in a SvelteKit project with the `@tailwindcss/vite` plugin.

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

```svelte
<!-- +page.svelte -->
<h1 class="text-3xl font-bold underline">
  <!-- prettier-ignore -->
  Hello world!
</h1>

<style lang="postcss">
  @reference "tailwindcss";

  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
```

## Notes

- `<style>` blocks processed by Tailwind need `@reference "tailwindcss";` to access the theme.
- Start the build with `npm run dev`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/sveltekit.tsx` (fetched 2026-10-16).
