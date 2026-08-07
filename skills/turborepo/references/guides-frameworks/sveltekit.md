# SvelteKit

## Usage

### Quickstart

```bash
pnpm dlx create-turbo@latest -e with-svelte
pnpm dlx sv create apps/my-app  # add to an existing repo
```

### Referencing internal packages

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

### Micro-frontend configuration

SvelteKit is also Vite-based, so set `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: "/admin",
});
```
