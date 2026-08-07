# createSearchParams

Creates a `URLSearchParams` object using the given initializer. Identical to `new URLSearchParams(init)` with one enhancement: it supports arrays as values in object-form initializers, not just strings.

## Signature / Usage

```typescript
function createSearchParams(init: URLSearchParamsInit = ""): URLSearchParams
```

Without `createSearchParams` (standard `URLSearchParams`):

```javascript
let searchParams = new URLSearchParams([
  ["sort", "name"],
  ["sort", "price"],
]);
```

With `createSearchParams` (more convenient):

```javascript
let searchParams = createSearchParams({
  sort: ["name", "price"],
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `init` | `URLSearchParamsInit` | `""` | The value used to initialize the URL search parameters |

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)
- Supports multiple values for a key via an array, avoiding manual tuple-array construction

## Related

- [href](./href.md)
