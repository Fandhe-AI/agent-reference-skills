# SSG Helper

Generate a static site from a Hono application by crawling registered routes and writing HTML files.

## Signature / Usage

```ts
import { toSSG } from 'hono/ssg'
import fs from 'node:fs/promises'

const result = await toSSG(app, fs, { dir: './dist' })
// result: { success: boolean; files: string[]; error?: Error }
```

Platform-specific exports also available:

```ts
import { toSSG } from 'hono/deno'  // Deno
import { toSSG } from 'hono/bun'   // Bun
```

## Options / Props

### `toSSG(app, fsModule, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `app` | `Hono` | Application with registered routes |
| `fsModule` | `FileSystemModule` | Object implementing `writeFile()` and `mkdir()` |
| `options.dir` | `string` | Output directory (default: `'./static'`) |
| `options.concurrency` | `number` | Parallel file generation count (default: `2`) |
| `options.extensionMap` | `Record<string, string>` | Maps `Content-Type` to file extension |
| `options.plugins` | `SSGPlugin[]` | Plugins for custom generation behavior |

### `FileSystemModule` interface

Must implement:
- `writeFile(path, data): Promise<void>`
- `mkdir(path, { recursive }): Promise<void | string>`

### Return value

`{ success: boolean; files: string[]; error?: Error }`

## Notes

- Route-to-path mapping: `/` → `index.html`, `/path` → `path.html`, `/path/` → `path/index.html`
- File extension is derived from the route's `Content-Type` response header
- By default, `defaultPlugin` skips routes that return non-200 status codes
- Custom plugins must explicitly include `defaultPlugin` to retain the default skip behavior

## Related

- [Dev Helper](./dev.md)
