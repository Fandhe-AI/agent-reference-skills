# Vite

## Usage

### Quickstart

```bash
pnpm dlx create-turbo@latest -e with-vite
```

### Referencing internal packages

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

### Micro-frontend configuration

```ts
export default defineConfig({
  base: "/admin",
});
```

### Module Federation

Use the `with-vite-module-federation` template for runtime module sharing:

```bash
pnpm dlx create-turbo@latest -e with-vite-module-federation
```

This allows sharing React / Vue / Svelte components and dependencies across multiple Vite apps and packages at runtime.

`turbo.json` configuration when using Module Federation:
- `dev` task: `"cache": false`, `"persistent": true`, `"dependsOn": ["^build"]` (build shared packages first)

## Notes

- Not setting `base` causes images and CSS to be routed incorrectly.

## Related

- [Next.js](./nextjs.md)
- [Rsbuild](./rsbuild.md)
