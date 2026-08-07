# @primaryExport

Modifier tag that controls how re-exports are processed, forcing TypeDoc to convert a symbol immediately.

## Signature / Usage

```
/** @primaryExport */
```

By default, TypeDoc defers conversion of re-exported symbols and uses the original module as the documented reference when available. The `@primaryExport` tag overrides this behavior, forcing TypeDoc to convert the symbol immediately rather than deferring it.

When applied to a namespace comment, the re-exports within that namespace are converted and documented directly inside the namespace rather than referencing their original source.

This is useful when both a hierarchical export structure and a flat export structure need to be maintained, while pointing the documentation at a specific location.

```typescript
/**
 * We want the primary documentation for the model to live in this
 * namespace, while also keeping a flat export structure for backward
 * compatibility.
 * @primaryExport
 */
export * as Models from "./models/index.js";
export * from "./models/index.js";
```

```typescript
/**
 * All utility functions.
 * @primaryExport
 */
export * as Utils from "./utils/index.js";
// Flat access is also available
export * from "./utils/index.js";
```

## Notes

- Applied to a namespace declaration that contains re-exports
- Overrides TypeDoc's default deferred conversion strategy
- Useful for making hierarchical and flat exports coexist

## Related

- [@packageDocumentation](./packageDocumentation.md)
- [@namespace](./namespace.md)
