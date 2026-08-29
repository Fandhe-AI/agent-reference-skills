---
source: https://tanstack.com/router/latest/docs/framework/react/guide/custom-search-param-serialization
---

# Custom Search Param Serialization

By default, TanStack Router serializes/deserializes search params with `JSON.stringify`/`JSON.parse`. `parseSearch`/`stringifySearch` router options let you swap in another format.

## Signature / Usage

```tsx
import {
  createRouter,
  parseSearchWith,
  stringifySearchWith,
} from '@tanstack/react-router'

const router = createRouter({
  parseSearch: parseSearchWith(JSON.parse),
  stringifySearch: stringifySearchWith(JSON.stringify),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `parseSearch` (RouterOptions) | function | Parses the raw search string into an object |
| `stringifySearch` (RouterOptions) | function | Serializes the search object back into a string |
| `parseSearchWith(fn)` | helper | Wraps a parse function (e.g. `JSON.parse`, a library's `parse`) into `parseSearch` |
| `stringifySearchWith(fn)` | helper | Wraps a stringify function into `stringifySearch` |

## Notes

- Alternatives demonstrated: Base64 encoding, `query-string`, `JSURL2`, `Zipson`.
- Serialization must be idempotent — deserializing a serialized value must reproduce the original object, or information can be lost.
- For Base64/Zipson approaches, use the provided safe binary `encodeToBinary`/`decodeFromBinary` helpers rather than raw `atob`/`btoa`, which mishandle non-UTF8 characters.
- Base64-encoding raw user input risks collisions with URL deserialization; prefer the safe binary encoding helpers to mitigate this.

## Related

- [search-params.md](./search-params.md)
