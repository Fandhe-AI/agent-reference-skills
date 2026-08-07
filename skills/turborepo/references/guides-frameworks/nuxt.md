# Nuxt

## Usage

### Quickstart

```bash
pnpm dlx create-turbo@latest -e with-vue-nuxt
pnpm dlx nuxi@latest init apps/my-app  # add to an existing repo
```

### Referencing internal packages

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

### Micro-frontend configuration

Nuxt uses Vite internally, so set `base` in `vite.config.ts`:

```ts
export default defineConfig({
  base: "/admin",
});
```
