# react-router.config.ts

Optional project configuration file for React Router Framework Mode. Located at the project root. Export a value satisfying `Config` from `@react-router/dev/config`.

## Signature / Usage

```typescript
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  appDirectory: "app",
  buildDirectory: "build",
} satisfies Config;
```

## Options / Props

### Core Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ssr` | `boolean` | `true` | Enable server-side rendering. Set to `false` for SPA mode (pre-renders to `index.html`) |
| `basename` | `string` | `"/"` | URL prefix for the entire app |
| `appDirectory` | `string` | `"app"` | Path to the app directory, relative to project root |
| `buildDirectory` | `string` | `"build"` | Path to the build output directory |
| `serverModuleFormat` | `"esm" \| "cjs"` | `"esm"` | Output format of the server build |
| `serverBuildFile` | `string` | `"index.js"` | Filename of the server build output (must end in `.js`) |

### Prerendering

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `prerender` | `string[] \| (opts) => Promise<string[]>` | `undefined` | URLs to prerender to static HTML at build time |

```typescript
export default {
  prerender: async ({ getStaticPaths }) => {
    const paths = await getStaticPaths();
    return ["/", ...paths];
  },
} satisfies Config;
```

### Server Bundles

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `serverBundles` | `({ branch }) => string` | `undefined` | Assign routes to separate server bundles by returning a bundle ID |

```typescript
export default {
  serverBundles: ({ branch }) =>
    branch.some((r) => r.id === "admin") ? "admin" : "main",
} satisfies Config;
```

### Route Discovery

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `routeDiscovery` | `{ mode: "lazy" \| "initial", manifestPath?: string }` | `{ mode: "lazy", manifestPath: "/__manifest" }` | Controls when/how the client loads the route manifest |

### Future Flags

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `future` | `object` | `{}` | Opt into upcoming features before they become defaults |

```typescript
export default {
  future: {
    // future flags go here
  },
} satisfies Config;
```

### Other Options

| Name | Type | Description |
|------|------|-------------|
| `allowedActionOrigins` | `string[]` | Allowed origin hosts for action submissions (supports `*` / `**` glob) |
| `buildEnd` | `async (opts) => void` | Hook called after the full build completes |
| `presets` | `array` | Plugin config presets for platform/tool integration |

## Notes

- Setting `ssr: false` puts the app in SPA mode — no server is required, but loaders/actions still run at build time for prerendered pages.
- `prerender` requires `ssr: true` or acts as the only output in SPA mode.
- `serverBundles` enables splitting the server into multiple deployable units (useful for edge deployments).

## Related

- [routes.ts](./routes-ts.md)
- [entry.server.tsx](./entry-server-tsx.md)
