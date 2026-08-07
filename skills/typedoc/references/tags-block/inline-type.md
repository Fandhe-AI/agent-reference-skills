# @inline / @inlineType / @preventInline

Tags controlling inlining of type aliases and interfaces when rendered. This page covers the block tags `@inlineType`, `@preventInline`, and the modifier tag `@inline`.

## Signature / Usage

```
@inline
```

```
@inlineType Type Name
```

```
@preventInline Type Name
```

### @inline (modifier tag)

When applied to a type alias or interface, TypeDoc expands and inlines the type wherever it is referenced (instead of creating a reference to the type).

**Limitations**:
- Inlining may not be possible in certain cases, such as type references with type parameters
- May produce incorrect results for types other than object literals, unions, intersections, and literal types
- Applying this tag to a commonly used type can significantly increase documentation size

### @inlineType (block tag)

Provides selective inlining for a specific reference. Lets you inline a type at a specific location without applying inlining globally. Specify the type name without type arguments in the tag.

### @preventInline (block tag)

Prevents inlining of a type marked with `@inline`, creating a named reference instead.

**Important note**: if TypeScript itself does not generate a named reference for the underlying type structure, this tag cannot prevent expansion.

### Using @inline

```typescript
/**
 * @inline
 */
export type HelloProps = {
    name: string;
    greeting?: string;
};

/** Renders a greeting */
export function Hello(props: HelloProps): JSX.Element;
```

### Using @inlineType

```typescript
/**
 * @inlineType HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

### Using @preventInline

```typescript
/**
 * @preventInline HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

## Notes

- `@inline` is a modifier tag; `@inlineType` and `@preventInline` are block tags
- Applying `@inline` to a frequently used type significantly increases documentation size
- `@preventInline` has no effect if TypeScript does not generate a named reference
- May produce inaccurate results for types other than object literals, unions, intersections, and literal types

## Related

- [@expand](./expand.md) -- controlling type expansion (@expand, @expandType, @preventExpand)
