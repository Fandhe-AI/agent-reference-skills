# Rsbuild

## Usage

### Quickstart

```bash
pnpm dlx create-turbo@latest -e with-rsbuild
```

To add to an existing repo:

```bash
npx create-rsbuild@latest apps/my-app --template react
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
  server: {
    base: "/admin",
  },
});
```

Rsbuild uses `server.base` as the default asset prefix for both development and production, so set `server.base` in child applications.

### Module Federation

Use the `with-rsbuild-module-federation` template for runtime module sharing:

```bash
pnpm dlx create-turbo@latest -e with-rsbuild-module-federation
```

It consists of a host app (port 3000), a remote app (port 3001), and a shared UI package, started with `turbo dev`.

`turbo.json` configuration when using Module Federation:
- `dev` task: `"cache": false`, `"persistent": true`
- `dependsOn: ["^build"]` (build shared packages first)

## Related

- [Vite](./vite.md)
