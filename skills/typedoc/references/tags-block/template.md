# @template

Block tag for documenting the type parameters of a function, method, class, interface, or type alias.

## Signature / Usage

```
@template TypeParamName - description
```

```
@template {ConstraintType} TypeParamName - description
```

The `@template` tag is used to document the type parameters of a function, method, class, interface, or type alias.

TypeDoc treats `@template` as an alias of `@typeParam` for compatibility with JavaScript projects. In TypeScript projects, using the TSDoc-standard `@typeParam` tag is recommended.

```javascript
/**
 * @template {string} T - the identity type
 */
export function identity(x) {
    return x;
}
```

## Notes

- TypeDoc processes `@template` as an alias of `@typeParam`
- Mainly used when documenting TypeScript in JavaScript projects via doc comments
- `@typeParam` is recommended for TypeScript projects
- Type constraints (such as `{string}`) can be included

## Related

- [@typeParam](./typeParam.md) -- the recommended alternative tag for TypeScript projects
