# @since

Block tag for recording the version in which a method or feature was introduced.

## Signature / Usage

```
@since version information
```

The `@since` tag can be used to document the version in which a method was introduced. TypeDoc assigns no special behavior to this tag; it is rendered as a paragraph in the generated comment.

```typescript
/**
 * @since Introduced in v1.2.3
 */
export function rand(min: number, max: number): number;
```

## Notes

- TypeDoc applies no special formatting or processing to this tag
- Rendered as standard paragraph text in the generated documentation
- Useful for giving API consumers version-history context

## Related

- [@author](./author.md) -- another metadata tag with no special behavior
- [@deprecated](./deprecated.md) -- can be combined with deprecation version information
