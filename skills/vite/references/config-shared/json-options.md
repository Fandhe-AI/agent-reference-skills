---
source: https://vite.dev/config/shared-options#json-namedexports
---

# json.namedExports / json.stringify

Options for importing `.json` files.

## Signature / Usage

```js
export default defineConfig({
  json: {
    namedExports: true,
    stringify: 'auto',
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `json.namedExports` | `boolean` | `true` | Whether to support named imports from `.json` files. |
| `json.stringify` | `boolean \| 'auto'` | `'auto'` | `true`: imported JSON becomes `export default JSON.parse("...")`, significantly more performant than object literals, especially for large files. `'auto'`: stringify only if the data is bigger than 10kB. |

## Related

- [JSON](../features/json.md)
