# @expand

Modifier tag that causes TypeDoc to inline-expand a type alias or interface's declaration at every location where the type is referenced.

## Signature / Usage

```
/** @expand */
```

Placing `@expand` on a type alias or interface causes TypeDoc to expand and display the type declaration at every location where the type is referenced.

When applied to a namespace or module, the tag is inherited.

Especially useful for React components: property documentation is displayed inline when viewing the component function itself.

**Note**: applying this tag to a frequently used type can significantly increase the size of the generated documentation.

```typescript
/**
 * Props docs
 * @expand
 */
export type HelloProps = {
    /** Name property docs */
    name: string;
};

/**
 * Hello
 */
export function Hello(props: HelloProps) {
    return {};
}
```

## Notes

- A modifier tag; it takes no value or content
- Applying it to a frequently used type significantly increases documentation size
- Inherited when applied to a namespace or module
- Used alongside the related block tags `@expandType` (expand only a specific type reference) and `@preventExpand` (explicitly prevent expansion)

## Related

- [expand (block tags @expandType / @preventExpand)](../tags-block/expand.md)
- [@inline](./inline.md)
- [inline-type (block tags @inlineType / @preventInline)](../tags-block/inline-type.md)
