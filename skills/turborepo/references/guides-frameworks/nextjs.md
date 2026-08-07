# Next.js

## Usage

### Quickstart

```bash
pnpm dlx create-turbo@latest        # default template
pnpm dlx create-next-app@latest apps/my-app  # add to an existing repo
```

### Referencing internal packages

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

### Customizing tasks

By default, tasks from the root `turbo.json` are used. App-specific configuration can override this via Package Configurations.

### Micro-frontend configuration

```ts
// apps/docs/next.config.ts
const nextConfig: NextConfig = {
  basePath: "/docs",
};
export default nextConfig;
```

## Notes

- Forgetting to set `basePath` breaks asset routing.

## Related

- [Vite](./vite.md)
