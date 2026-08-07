# @property / @prop

Block tag for adding documentation comments to the children of a reflection.

## Signature / Usage

```
@property propertyName Description of the property
```

or

```
@prop propertyName Description of the property
```

The `@property` tag (alias: `@prop`) is used to add documentation comments to the children of a reflection when it is inconvenient to place an inline comment.

This tag is primarily intended for use alongside `@namespace` and `@interface` tags. Types converted by those tags may not have a convenient place to put a comment on each member.

```typescript
/**
 * This will be displayed as an interface
 * @property a comment for a
 * @prop b comment for b
 * @interface
 */
export type Resolved = Record<"a" | "b" | "c", string>;
```

The example above is processed as:

```typescript
export interface Resolved {
    /** comment for a */
    a: string;
    /** comment for b */
    b: string;
    c: string;
}
```

## Notes

- `@property` and `@prop` behave identically
- Primarily used alongside `@namespace` or `@interface` tags
- Useful when it is difficult to write an individual JSDoc comment for each property
- Undocumented properties (such as `c` in the example above) are displayed without a comment

## Related

- `@namespace` tag -- conversion into a namespace
- `@interface` tag -- conversion into an interface
- [@defaultValue](./defaultValue.md) -- documenting a property's default value
