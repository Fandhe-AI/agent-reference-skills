---
source: https://tanstack.com/start/latest/docs/framework/react/guide/import-protection
---

# Import Protection

The `tanstackStart()` Vite/Rsbuild plugin's `importProtection` option statically analyzes imports and denies (errors or mocks) server-only code from reaching the client bundle, and browser-only code from reaching the server bundle.

## Signature / Usage

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      importProtection: {
        // Always error, even in dev
        behavior: 'error',
      },
    }),
  ],
})
```

### Per-mode behavior

```ts
importProtection: {
  behavior: {
    dev: 'mock',
    build: 'error',
  },
}
```

### Denying specific packages/files

```ts
importProtection: {
  client: {
    // Block specific npm packages from the client bundle
    specifiers: ['@prisma/client', 'bcrypt'],
    // Block files in a custom directory
    files: ['**/db/**'],
  },
  server: {
    // Block browser-only libraries from the server
    specifiers: ['localforage'],
  },
}
```

### File markers

```ts
import '@tanstack/react-start/server-only'

export const API_KEY = process.env.API_KEY
```

```ts
import '@tanstack/react-start/client-only'

export function savePreferences(prefs: Record<string, string>) {
  localStorage.setItem('prefs', JSON.stringify(prefs))
}
```

### Scoping checks

```ts
importProtection: {
  // Only check files matching these patterns
  include: ['src/**'],
  // Skip checking these files
  exclude: ['src/generated/**'],
  // Ignore violations when these files are the importer
  ignoreImporters: ['**/*.test.ts', '**/*.spec.ts'],
}
```

### `onViolation` callback

```ts
importProtection: {
  onViolation: async (info) => {
    // info.env -- environment name (e.g. 'client', 'ssr', ...)
    // info.envType -- 'client' or 'server'
    // info.type -- 'specifier', 'file', or 'marker'
    // info.specifier -- the raw import string
    // info.importer -- absolute path of the importing file
    // info.resolved -- absolute path of the resolved target (if available)
    // info.trace -- array of { file, line?, column?, specifier? } objects
    // info.snippet -- { lines, highlightLine, location } with the source code snippet (if available)

    // Return false (or Promise<false>) to allow this specific import (override the denial)
    if (info.specifier === 'some-special-case') {
      return false
    }
  },
}
```

### Disabling

```ts
importProtection: {
  enabled: false,
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `boolean` | Enable/disable import protection entirely |
| `behavior` | `'error' \| 'mock' \| { dev?: 'error' \| 'mock'; build?: 'error' \| 'mock' }` | What happens on a violation: throw a build/runtime error, or mock the import out |
| `log` | `'once' \| 'always'` | Violation logging frequency |
| `include` / `exclude` | `Array<string \| RegExp>` | Restrict which files are checked |
| `ignoreImporters` | `Array<string \| RegExp>` | Skip violations whose importer matches (e.g. test files) |
| `maxTraceDepth` | `number` | Depth of the import trace collected for violation reports |
| `client.specifiers` / `client.files` | `Array<string \| RegExp>` | Package specifiers / files denied from the client bundle |
| `client.excludeFiles` | `Array<string \| RegExp>` | Files excluded from client-side file-pattern checks (e.g. `node_modules`) |
| `server.specifiers` / `server.files` | `Array<string \| RegExp>` | Package specifiers / files denied from the server bundle |
| `server.excludeFiles` | `Array<string \| RegExp>` | Files excluded from server-side file-pattern checks |
| `onViolation` | `(info) => boolean \| void \| Promise<boolean \| void>` | Custom hook run per violation; returning `false` allows that specific import through |

## Notes

- Default rules already deny obviously server-only (DB drivers, `fs`) and browser-only (`window`, `localforage`-style) packages; `client`/`server` options add to this list.
- File markers (`@tanstack/react-start/server-only`, `client-only`) mark an entire file without requiring a `*.server.ts` naming convention — useful because `createServerFn().handler()` bodies are compiler-rewritten out of the client build, but a plain helper referenced outside that boundary ("leaky helper") is not, and will fail import protection instead — wrap such helpers with `createServerOnlyFn()` or a file marker.
- Type-only imports are exempt from import protection.
- `dev: 'mock'` is useful to avoid hard build failures during local development while still erroring in `build`.
- Barrel files (`src/lib/index.ts`) that re-export both client-safe and server-only code from the same entry point are a common false-positive source; split server-only exports into a separate module (e.g. `src/lib/server.ts`).

## Related

- [Execution Model](./execution-model.md)
- [Environment Functions](./environment-functions.md)
- [Environment Variables](./environment-variables.md)
