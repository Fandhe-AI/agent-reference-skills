# @remarks

Block tag for separating the summary section of a comment from its detailed description.

## Signature / Usage

```
@remarks
Detailed description text
```

The `@remarks` tag can be used to separate the summary section of a doc comment from additional detailed information.

Conforms to the TSDoc specification.

**Limit**: at most one `@remarks` block is allowed per comment.

**Inheritance**: unlike most other tags, the content of `@remarks` is also propagated when `{@inheritDoc}` is used.

**Theme handling**: rendering may vary by theme. In the default TypeDoc theme it is rendered under a `# Remarks` heading like any other block tag, with no special styling applied.

```typescript
/**
 * Some docs here
 *
 * @remarks
 * Much longer documentation here that provides
 * detailed information about the implementation
 * and usage patterns.
 */
export function rand(): number;
```

## Notes

- At most one `@remarks` tag can be used per comment
- Content is inherited when `{@inheritDoc}` is used
- Rendered under a `# Remarks` heading in the default theme
- Other themes may render it differently

## Related

- [@privateRemarks](./privateRemarks.md) -- non-public internal notes
- [@summary](./summary.md) -- customizing the summary
- `{@inheritDoc}` -- inheriting documentation
- [TSDoc @remarks](https://tsdoc.org/pages/tags/remarks/)
