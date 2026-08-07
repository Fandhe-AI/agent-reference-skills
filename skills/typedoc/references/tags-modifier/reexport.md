# @reexport

Modifier tag applied to a type alias or variable declaration that references another symbol, telling TypeDoc to treat it as a re-export.

## Signature / Usage

```typescript
/** @reexport */
export const SymbolName = importedSymbol;

/** @reexport */
export type TypeName = ImportedType;
```

The `@reexport` tag is applied to a type alias or variable declaration that references another symbol. With this tag, TypeDoc treats the declaration as a re-export of the referenced symbol rather than converting it directly.

TypeDoc recommends using actual `export { X } from "./module.js"` re-export syntax where possible, since it makes it easier for library consumers to reach the original source via "Go To Definition" compared to re-exporting through a type alias or variable.

Applying this tag to a reference that cannot actually be treated as a re-export of a real symbol — such as a literal value, or an object containing functions — produces a warning.

```typescript
namespace MathUtils {
    /** @reexport */
    export const Vector = OriginalVector;

    /** @reexport */
    export type IsInt = OriginalIsInt;
}
```

## Notes

- A modifier tag; it takes no value or content
- Can only be applied to type alias/variable declarations that reference another symbol
- Prefer actual re-export syntax (`export { X } from "..."`) where possible; `@reexport` is an alternative
- Applying it to a reference that cannot be treated as a re-export (e.g. a literal value or an object containing functions) produces a warning

## Related

- [@inline](./inline.md)
- [@primaryExport](./primaryExport.md)
