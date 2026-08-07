# @inline

Modifier tag that causes TypeDoc to inline-expand a type alias or interface's definition at the location where it is referenced.

## Signature / Usage

```
/** @inline */
```

Applying `@inline` to a type alias or interface causes TypeDoc to inline the type definition itself, instead of creating a reference to the type, at every location where the type is referenced.

**Limitations**:

- Inlining may not be possible in certain cases, such as type references with type parameters
- Applying it to a type that is not an object literal, union, or intersection type may produce incorrect results
- Applying it to a frequently used type can significantly increase the size of the generated documentation

```typescript
/** @inline */
export type HelloProps = {
    /** Name property docs */
    name: string;
};

export function Hello(props: HelloProps) {
    return <span>Hello {props.name}!</span>;
}
```

In this example, wherever `HelloProps` is referenced, `{ name: string }` is expanded inline as if it were written there directly, instead of a reference to the type alias.

## Notes

- A modifier tag; it takes no value or content
- May produce inaccurate results for types other than object literals, unions, and intersections
- Applying it to a frequently used type significantly increases documentation size
- Used alongside the related block tags `@inlineType` (inline only a specific type reference) and `@preventInline` (explicitly prevent inlining)

## Related

- [inline-type (block tags @inlineType / @preventInline)](../tags-block/inline-type.md)
- [@expand](./expand.md)
- [expand (block tags @expandType / @preventExpand)](../tags-block/expand.md)
