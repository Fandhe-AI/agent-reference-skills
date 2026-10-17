---
source: https://vite.dev/guide/features#glob-import
---

# import.meta.glob

Vite supports importing multiple modules from the file system via `import.meta.glob`. Matched files are lazy-loaded via dynamic import by default and split into separate chunks at build.

## Signature / Usage

```js
const modules = import.meta.glob('./dir/*.js')
```

Transformed by Vite into:

```js
const modules = {
  './dir/bar.js': () => import('./dir/bar.js'),
  './dir/foo.js': () => import('./dir/foo.js'),
}
```

Iterate over the keys:

```js
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```

Eager (static) import:

```js
const modules = import.meta.glob('./dir/*.js', { eager: true })
```

Multiple and negative patterns (prefix `!`):

```js
const modules = import.meta.glob(['./dir/*.js', './another/*.js'])
const filtered = import.meta.glob(['./dir/*.js', '!**/bar.js'])
```

Named imports (`import: 'default'` imports the default export; combined with `eager` tree-shaking is possible):

```ts
const modules = import.meta.glob('./dir/*.js', {
  import: 'setup',
  eager: true,
})
```

Custom queries:

```ts
const moduleStrings = import.meta.glob('./dir/*.svg', {
  query: '?raw',
  import: 'default',
})
const moduleUrls = import.meta.glob('./dir/*.svg', {
  query: '?url',
  import: 'default',
})
const custom = import.meta.glob('./dir/*.js', {
  query: { foo: 'bar', bar: true },
})
```

Base path and case sensitivity:

```ts
const modulesWithBase = import.meta.glob('./**/*.js', {
  base: './base',
})
const modules = import.meta.glob('./dir/module*.js', {
  caseSensitive: false,
})
```

## Options / Props

From `ImportGlobOptions` in `packages/vite/types/importGlob.d.ts` (v8.3.4):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| eager | boolean | false | Import as static or dynamic |
| import | string | — | Import only the specific named export. `default` imports the default export |
| query | string \| Record<string, string \| number \| boolean> | — | Custom queries |
| exhaustive | boolean | false | Search files also inside `node_modules/` and hidden directories (e.g. `.git/`); may impact performance |
| base | string | — | Base path to resolve relative paths |
| caseSensitive | boolean | true | Whether glob matching is case-sensitive |
| as | string | — | Deprecated. Use `query` instead, e.g. `as: 'url'` -> `query: '?url', import: 'default'` |

## Notes

- This is a Vite-only feature, not a web or ES standard.
- Glob patterns are treated like import specifiers: relative (`./`), absolute (`/`, resolved relative to project root), or an alias path.
- Matching is done via `tinyglobby`.
- All arguments to `import.meta.glob` must be passed as literals. Variables or expressions cannot be used.
- The `base` option can only be a directory path relative to the importer file or absolute against the project root. Aliases and virtual modules are not supported. Only globs that are relative paths are interpreted relative to the resolved base, and all resulting module keys are made relative to the base.
- With `caseSensitive: false`, `module*.js` matches `Module.js`, `module.js`, `MODULE.js`.

## Related

- [Dynamic Import](./dynamic-import.md)
- [Asset URL imports](../assets-env/asset-url-imports.md)
