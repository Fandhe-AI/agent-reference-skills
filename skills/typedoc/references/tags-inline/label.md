# @label

An inline tag that assigns a name to an overloaded function signature. The assigned name can then be referenced via a declaration reference. Conforms to the TSDoc spec (https://tsdoc.org/pages/tags/label/).

## Signature / Usage

```
{@label IDENTIFIER}
```

Referencing a labeled signature from a declaration reference (colon-separated):

```
{@link functionName:LABEL_NAME}
```

### Identifier constraints

The identifier passed to `@label` must follow these rules:

- Only uppercase letters (A-Z), digits (0-9), and underscores (`_`) are allowed
- Cannot start with a digit
- If these rules are violated, TypeDoc cannot use the label when building declaration references

### Examples

```typescript
/** {@label BASE} */
export function round(x: number): number;

/** {@label PRECISION} */
export function round(x: number, y: number): number;

export function round(x: number, y = 0): number {
  const factor = 10 ** y;
  return Math.round(x * factor) / factor;
}
```

```typescript
/**
 * Value rounded with a specified precision.
 * Rounding uses {@link round:PRECISION}.
 */
export const rounded = round(123.456, 2);
```

```typescript
/**
 * {@link round:BASE} rounds to an integer, while
 * {@link round:PRECISION} rounds to a specified number of digits.
 */
export function formatNumber(value: number): string {
  return round(value, 2).toFixed(2);
}
```

## Notes

- `@label` lets a specific overload be referenced by name instead of by its parameter signature, when a function has multiple overloads.
- The name assigned by `@label` can be used with the `@link` tag's declaration-reference syntax.
- Identifiers may only contain uppercase letters, digits, and underscores (e.g. `BASE`, `PRECISION`, `WITH_OPTIONS`), and cannot start with a digit (e.g. `2ND` is invalid, `SECOND` is valid).
- TSDoc defines `@label` as a core tag, but the declaration-reference form TypeDoc implements (`functionName:LABEL`) is not permitted by the TSDoc standard itself — TypeDoc extends the declaration-reference grammar to support it.
- Primarily used to unambiguously reference a specific signature of an overloaded function.

## Related

- [@link](./link.md) — link tag used to reference labels
- [Declaration References](../guides/declaration-references.md) — declaration reference syntax
