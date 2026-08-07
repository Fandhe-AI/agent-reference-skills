# @expand / @expandType / @preventExpand

Tags controlling how type aliases and interfaces are displayed in documentation. This page covers the block tags `@expandType`, `@preventExpand`, and the modifier tag `@expand`.

## Signature / Usage

```
@expand
```

```
@expandType Type Name
```

```
@preventExpand Type Name
```

### @expand (modifier tag)

When placed on a type alias or interface, TypeDoc inline-expands the type declaration everywhere the type is referenced.

**Caution**: applying this tag to a commonly used type can significantly increase the size of the generated documentation.

It is especially useful for React components, since it causes prop documentation to appear when viewing the component function itself.

### @expandType (block tag)

Placed on any reflection to expand a specific type reference at render time. Specify the type name without type arguments in the tag.

This tag is inherited across a namespace or module, so a single declaration can expand a type throughout the scope.

### @preventExpand (block tag)

Explicitly prevents expansion of a type that would otherwise be expanded via `@expand`, `@expandType`, or `@param` documentation. Provides fine-grained control to selectively disable expansion.

### Using @expand

```typescript
/**
 * @expand
 */
export type HelloProps = {
    name: string;
    greeting?: string;
};

/** Renders a greeting */
export function Hello(props: HelloProps): JSX.Element;
```

### Using @expandType

```typescript
/**
 * @expandType HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

### Using @preventExpand

```typescript
/**
 * @preventExpand HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

## Notes

- `@expand` is a modifier tag; `@expandType` and `@preventExpand` are block tags
- Applying `@expand` to a frequently used type significantly increases documentation size
- `@expandType` is inherited across namespaces/modules
- `@preventExpand` can override expansion caused by `@expand` or `@expandType`

## Related

- [inline-type](./inline-type.md) -- controlling type inlining (@inline, @inlineType, @preventInline)
- [@param](./param.md) -- related to parameter type expansion
