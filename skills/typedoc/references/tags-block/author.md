# @author

Block tag that records the author of a method or function.

## Signature / Usage

```
@author Author Name
```

TypeDoc assigns no special behavior to this tag; it is rendered as a paragraph in the generated comment. It is purely informational and appears as regular paragraph text in the documentation output.

```typescript
/**
 * @author John Smith
 */
export function rand(min: number, max: number): number;
```

## Notes

- Place it inside a JSDoc-style comment (`/** */`)
- The tag content is rendered as standard paragraph text in the generated documentation
- No special configuration or processing is required

## Related

- [@since](./since.md) -- recording version information
