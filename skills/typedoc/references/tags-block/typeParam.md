# @typeParam

Block tag for documenting the type parameters of a function, method, class, interface, or type alias.

## Signature / Usage

```
@typeParam TypeParamName - description
```

The `@typeParam` tag is used to document the type parameters of a function, method, class, interface, or type alias. TypeDoc recognizes `@template` as an equivalent alias.

Conforms to the TSDoc specification.

**Notes on TSDoc compatibility**: the TSDoc standard specifies two requirements:
1. The tag should not include type information
2. The description should follow the parameter name, separated by a hyphen

However, TypeDoc relaxes these constraints for improved compatibility with TypeScript type annotations in JavaScript files. All of the following variants are treated identically:

- `@typeParam test - description`
- `@typeParam test description`
- `@typeParam {string} test - description`
- `@typeParam {string} test description`

```typescript
/**
 * @typeParam T - the identity type
 */
export function identity<T>(x: T): T {
    return x;
}
```

## Notes

- TypeDoc supports flexible syntax regardless of the hyphen separator or presence of type information
- `@template` is treated as an alias of `@typeParam`
- `@typeParam` is recommended for TypeScript projects

## Related

- [@template](./template.md) -- alternative syntax for JavaScript projects
- [@param](./param.md) -- documenting regular parameters
- [TSDoc @typeParam](https://tsdoc.org/pages/tags/typeParam/)
