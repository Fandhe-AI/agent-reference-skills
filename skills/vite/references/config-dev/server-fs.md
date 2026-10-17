---
source: https://vite.dev/config/server-options#server-fs-strict
---

# server.fs.strict / allow / deny

Restrict which files the dev server may serve.

## Signature / Usage

```js
import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        '/path/to/custom/allow_directory',
        '/path/to/custom/allow_file.demo',
      ],
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.fs.strict` | `boolean` | `true` (enabled by default since Vite 2.7) | Restrict serving files outside of workspace root |
| `server.fs.allow` | `string[]` | auto-detected workspace root | Restrict files that can be served via `/@fs/`. With `strict: true`, accessing files outside this list that are not imported from an allowed file results in 403. Directories and files are accepted |
| `server.fs.deny` | `string[]` | `['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}', '.npmrc', '.yarnrc.yml', '**/.git/**']` | Blocklist of sensitive files. Higher priority than `server.fs.allow`. picomatch patterns supported |

## Notes

- Default for `allow`: Vite searches for the potential workspace root (a `workspaces` field in `package.json`, or `lerna.json` / `pnpm-workspace.yaml`), otherwise falls back to the project root.
- `allow` accepts absolute paths or paths relative to the project root, e.g. `allow: ['..']` to allow one level up.
- When `server.fs.allow` is specified, auto workspace root detection is disabled. Use `searchForWorkspaceRoot` (as above) to extend the original behavior.
- The deny blocklist does not apply to the public directory: all files there are served without filtering.
- The deny filter is applied against the module id and the id with query parameters stripped. A plugin can read any file in its load hook (including resolving symlinks to denied paths), so Vite cannot guarantee a denied file is inaccessible through an alternative path; add alternative paths to the deny list as well.

## Related

- [server-watch.md](./server-watch.md)
- [server-origin-sourcemap-ignore.md](./server-origin-sourcemap-ignore.md)
