# OpaqueTypes

A registry of types which the recursive type helpers (`Path`, `DeepPartial`, `FieldErrors`, ...) treat as opaque leaf values instead of recursing into their properties. It is empty by default and has no effect until you register a type into it via declaration merging.

## Signature / Usage

```tsx
export interface OpaqueTypes {}

export type OpaqueType = OpaqueTypes[keyof OpaqueTypes]
```

Register a rich third-party value type (such as Day.js `Dayjs`, Decimal.js `Decimal`, or Luxon `DateTime`) by augmenting `OpaqueTypes` in a `.d.ts` file (or anywhere the module is visible to the compiler):

```tsx
import type { Dayjs } from "dayjs"

declare module "react-hook-form" {
  interface OpaqueTypes {
    dayjs: Dayjs
  }
}
```

## Notes

- Once registered, any field typed as `Dayjs` (or a type that structurally contains one) is treated as a leaf by the internal type helpers, no matter how deeply nested it is in your form values.
- Without registration, helpers such as `Path<T>` and `DeepPartial<T>` recurse into every property of every object in `TFieldValues`, including internals of third-party classes. On a large or deeply nested form this can trigger an "excessively deep" complexity diagnostic or slow editor type-checking.
- Registering a type tells the helpers to stop at it and treat it as a single leaf value, the same way `Date` and `FileList` are already handled internally.
- Added in v7.87.0 (see the v7.87.0 release notes: https://github.com/react-hook-form/react-hook-form/releases/tag/v7.87.0).

## Related

- [Field / FieldPath / FieldPathByValue / FieldValues / FieldArrayWithId](./field-path-types.md)
