---
source: https://vite.dev/guide/features#glob-import
---

# Glob Import

Import many modules at once with `import.meta.glob`, lazily or eagerly.

```js
const modules = import.meta.glob('./dir/*.js')

for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```

```js
// eager, named import, negative pattern, raw query
const eager = import.meta.glob('./dir/*.js', { eager: true })
const setups = import.meta.glob('./dir/*.js', { import: 'setup', eager: true })
const filtered = import.meta.glob(['./dir/*.js', '!**/bar.js'])
const moduleStrings = import.meta.glob('./dir/*.svg', {
  query: '?raw',
  import: 'default',
})
```

## Notes

- Default is lazy (dynamic `import()`, split into separate chunks); `{ eager: true }` imports directly.
- Arguments must be passed as literals; variables and expressions are not allowed. Patterns must be relative (`./`), absolute from project root (`/`), or an alias path.
- Other options in the docs: `base`, `caseSensitive`, `query` as an object for custom queries.
- Matching uses `tinyglobby`. This is a Vite-only feature, not a web or ES standard.
