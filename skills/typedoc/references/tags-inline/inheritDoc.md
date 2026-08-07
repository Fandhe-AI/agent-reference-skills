# @inheritDoc

An inline tag that copies documentation from another reflection (symbol). Follows the TSDoc spec, under which only specific documentation elements are copied.

## Signature / Usage

### Braced form (TSDoc standard)

```
{@inheritDoc ReferenceName}
```

### Unbraced form (JSDoc-compatible)

```
@inheritDoc
```

In the unbraced form, TypeDoc inherits the comment from the "parent" reflection (the corresponding member on a parent class or interface).

### Examples

```typescript
/**
 * Documentation for the base class.
 * This class handles data processing.
 *
 * @remarks
 * Detailed implementation notes.
 */
export class SomeClass {}

/** {@inheritDoc SomeClass} */
export interface SomeUnrelatedClass {}
```

In this example, `SomeClass`'s documentation (summary, `@remarks`) is copied to `SomeUnrelatedClass`.

```typescript
export class Base {
  /**
   * Processes an element.
   *
   * @param input - the value to process
   * @returns the processing result
   */
  process(input: string): string {
    return input;
  }
}

export class Derived extends Base {
  /** {@inheritDoc Base.process} */
  process(input: string): string {
    return input.toUpperCase();
  }
}
```

```typescript
export class Base {
  /**
   * Runs initialization.
   */
  init(): void {}
}

export class Child extends Base {
  /**
   * @inheritDoc
   */
  init(): void {
    // documentation is automatically inherited from the parent class
  }
}
```

## Notes

- Per the TSDoc spec, only the following elements are copied: **summary**, the **`@remarks`** block, **`@param`** blocks, **`@typeParam`** blocks, and the **`@returns`** block.
- The braced form (`{@inheritDoc Target}`) can reference any reflection via a declaration reference, regardless of the class hierarchy.
- `{@inheritDoc}` (braced) is treated as an inline tag; `@inheritDoc` (unbraced) is treated as a block-level tag that inherits from the parent reflection — TSDoc classifies it as inline, JSDoc as block-level.
- TypeDoc supports both TSDoc and JSDoc syntax for this tag.
- The reference target is specified using declaration-reference syntax.

## Related

- [@include](./include.md) — includes content from an external file
- [@link](./link.md) — creates a link to another reflection
- [Declaration References](../guides/declaration-references.md) — declaration reference syntax
