---
source: https://vite.dev/guide/api-plugin#transforming-custom-file-types
---

# Plugin: Transform Custom File Types

Compile a custom file extension to JavaScript with a `transform` hook and a hook filter.

```js
const fileRegex = /\.(my-file-ext)$/

export default function myPlugin() {
  return {
    name: 'transform-file',

    transform: {
      filter: {
        id: fileRegex,
      },
      handler(src, id) {
        return {
          code: compileFileToJS(src),
          map: null, // provide source map if available
        }
      },
    },
  }
}
```

## Notes

- `compileFileToJS` is a placeholder in the docs, not a Vite API.
- Hook filters reduce Rust-to-JS calls in Rolldown; they are also supported by Rollup 4.38.0+ and Vite 6.3.0+. For compatibility with older versions, also re-check the pattern inside the handler (`if (!jsFileRegex.test(id)) return null`).
- The `transform` hook accepts either a function or the `{ filter, handler }` object form shown here.
