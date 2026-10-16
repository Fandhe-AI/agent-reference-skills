# Common Errors

Causes and fixes for frequent Vitest failures.

## Signature / Usage

```ts
// Custom package.json conditions: use ssr.resolve.conditions (node environment)
import { defineConfig } from 'vitest/config'

export default defineConfig({
  ssr: {
    resolve: {
      conditions: ['custom', 'import', 'default'],
    },
  },
})
```

## Notes

- **Cannot find module './relative-path'**: check the path; Vite ignores `tsconfig.json` `baseUrl` by default (install `vite-tsconfig-paths` and add `tsconfigPaths()` to `plugins`, or use a path not relative to root); do not use relative aliases, use `'@/': new URL('./src/', import.meta.url).pathname`.
- **Failed to Terminate Worker**: Node `fetch` with `pool: 'threads'`. The default `forks` pool does not have this; switch to `forks` or `vmForks`.
- **Project working directory does not change**: in multi-project runs `process.cwd()` stays where Vitest started; `root` only controls file lookup. Use `pool: 'forks'` with a project `setupFiles` that calls `process.chdir(fileURLToPath(new URL('.', import.meta.url)))`; `threads` cannot use `process.chdir()`.
- **Custom package conditions not resolved**: Vitest uses only `import` and `default` by default. Set `ssr.resolve.conditions` (node environment, `viteEnvironment: 'ssr'`); `resolve.conditions` applies to the `client` environment (browser mode, jsdom, happy-dom).
- **Segfaults and native code errors** (`Segmentation fault (core dumped)`, `Abort trap: 6`, etc.): native modules not thread-safe in `pool: 'threads'`; use `pool: 'forks'` (`vitest --pool=forks`).
- **Time zone does not change in worker threads**: `process.env.TZ` set in setup files or tests has no effect in `threads` / `vmThreads`. Set it before workers start: `TZ=Asia/Tokyo vitest`, in the config file, or in `globalSetup`. For runtime variation use `forks` / `vmForks` or `Intl.DateTimeFormat` `timeZone`.
- **Unhandled Promise Rejection**: a promise rejects without `await` / `.catch()`. `await` it, or assert with `await expect(fetchUser(123)).rejects.toThrow('User 123 not found')`.
- **Package fails to load in Vitest but works in your app**: externalized dependencies are loaded by Node directly (ESM syntax in `.js` without `"type": "module"`, extensionless ESM imports, wrong `exports`, CSS imports, etc.). Fix the package, or inline the whole dependency chain with `server.deps.inline: ['wrapper-package', 'broken-package']` (or `ssr.resolve.noExternal`, which Vitest merges into `server.deps.inline`).
- **CommonJS source code is not fully supported**: Vitest is ESM-first; `require()` always goes to Node directly, so plugins, aliases, transforms, and mocks do not apply, TypeScript cannot be required, and import plus require of one file can evaluate it twice. For CJS projects set `experimental.viteModuleRunner: false`; for a CJS package in an ESM monorepo use `server.deps.external: [/\/packages\/legacy-cjs\//]`.

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ['wrapper-package', 'broken-package'],
      },
    },
  },
})
```
- Source: https://vitest.dev/guide/common-errors (Vitest v5.0.5)

## Related

- [Config](./config.md)
- [Debugging](./debugging.md)
- [Improving Performance](./improving-performance.md)
