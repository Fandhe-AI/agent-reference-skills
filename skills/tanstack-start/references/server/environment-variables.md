---
source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables
---

# Environment Variables

Server functions and server routes can read any `process.env` variable (never exposed to the client); client code can only read variables prefixed `VITE_` (Vite) or `PUBLIC_` (Rsbuild default) via `import.meta.env`.

## Signature / Usage

```bash
# .env (Vite)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
VITE_APP_NAME=My TanStack Start App
```

```typescript
// Server function - can access any environment variable
const getUser = createServerFn().handler(async () => {
  const db = await connect(process.env.DATABASE_URL) // Server-only
  return db.user.findFirst()
})

// Client component - only VITE_ prefixed variables
export function AppHeader() {
  return <h1>{import.meta.env.VITE_APP_NAME}</h1> // Client-safe
}
```

Rsbuild uses `PUBLIC_` by default instead of `VITE_`.

### Runtime (non-build-time) client variables

```tsx
const getRuntimeVar = createServerFn({ method: 'GET' }).handler(() => {
  return process.env.MY_RUNTIME_VAR // notice `process.env` on the server, and no public prefix
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const foo = await getRuntimeVar()
    return { foo }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { foo } = Route.useLoaderData()
}
```

### Type declarations

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
```

### Runtime validation

```typescript
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

const clientEnvSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_API_URL: z.url(),
})

// NOTE: Module-level parse runs at module load. Fine for Node.js;
// on Cloudflare Workers (and other edge runtimes) `process.env` is
// empty at module load, so wrap this in a function and call it
// inside `.handler()` instead:
//
//   export const getServerEnv = () => envSchema.parse(process.env)
//
// Then read `getServerEnv()` per-request from server functions/middleware.
export const serverEnv = envSchema.parse(process.env)
export const clientEnv = clientEnvSchema.parse(import.meta.env)
```

### `NODE_ENV` static replacement

```ts title="vite.config.ts"
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        build: {
          // Replace process.env.NODE_ENV at build time (default: true)
          staticNodeEnv: true,
        },
      },
    }),
    viteReact(),
  ],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server.build.staticNodeEnv` | `boolean` | Statically replace `process.env.NODE_ENV` at build time for dead-code elimination. Default `true`; set `false` to keep it dynamic at runtime |

## Notes

- File hierarchy loaded in order: `.env` (commit) → `.env.development` / `.env.production` → `.env.local` (gitignore, local overrides).
- `VITE_...`/`PUBLIC_...` variables must be set at build time to be bundled into the client; setting them only at server runtime does not retroactively expose them to already-built client code (use a server function to read runtime-only values instead, see the "Runtime (non-build-time) client variables" example).
- Never read secrets (`DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`) via `import.meta.env` in client code — unprefixed variables resolve to `undefined` there by design.
- `staticNodeEnv: true` (default) means `if (process.env.NODE_ENV === 'development')` blocks are eliminated by dead-code elimination in production builds; disable it if `NODE_ENV` must be read dynamically at runtime.

## Related

- [Import Protection](./import-protection.md)
- [Execution Model](./execution-model.md)
- [Path Aliases](./path-aliases.md)
