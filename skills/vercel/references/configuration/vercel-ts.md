# vercel.ts

Programmatic TypeScript configuration for Vercel that executes at build time. Supports the same properties as `vercel.json` plus dynamic generation via code. Use only one config file: `vercel.ts` **or** `vercel.json`.

## Signature / Usage

```typescript
import { routes, deploymentEnv, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  buildCommand: 'npm run build',
  cleanUrls: true,
  trailingSlash: false,

  rewrites: [
    routes.rewrite('/api/(.*)', 'https://backend.example.com/$1'),
  ],
  redirects: [
    routes.redirect('/old-docs', '/docs', { permanent: true }),
  ],
  headers: [
    routes.cacheControl('/static/(.*)', {
      public: true,
      maxAge: '1 week',
      immutable: true,
    }),
  ],
  crons: [{ path: '/api/cleanup', schedule: '0 0 * * *' }],
};
```

## Options / Props

All `vercel.json` properties are available. See [vercel-json.md](./vercel-json.md) for the full property table.

Additional TypeScript-specific capabilities:

| Feature | Description |
|---------|-------------|
| `VercelConfig` type | Import from `@vercel/config/v1` for full type safety |
| `routes.rewrite(src, dest, opts?)` | Helper to create a rewrite rule |
| `routes.redirect(src, dest, opts?)` | Helper to create a redirect rule |
| `routes.header(src, headers, opts?)` | Helper to create a header rule |
| `routes.cacheControl(src, opts)` | Helper to set `Cache-Control` headers |
| `deploymentEnv(VAR)` | Reference an env variable for use in route `dest` or `args` at request time |
| Dynamic config | Any build-time logic is allowed; final config must be in `export const config` |

### Install

```bash
npm i @vercel/config
```

### Supported file names

`vercel.ts`, `vercel.js`, `vercel.mjs`, `vercel.cjs`, or `vercel.mts`.

## Notes

- The `config` export must be a named export: `export const config: VercelConfig = { ... }`
- `vercel.ts` executes at build time — not at request time (except `deploymentEnv` references which expand at request time)
- Migrate from `vercel.json` by copying its contents into the `config` export, then progressively add dynamic features
- Prefer `routes.*` helpers over raw objects for `rewrites`, `redirects`, and `headers` for type safety
- Legacy properties from `vercel.json` are available; see [static configuration reference](https://vercel.com/docs/project-configuration/vercel-json#legacy)

## Related

- [vercel-json.md](./vercel-json.md)
- [git-configuration.md](./git-configuration.md)
