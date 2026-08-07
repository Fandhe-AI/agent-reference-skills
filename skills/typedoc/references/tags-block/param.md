# @param / @this

Block tag for documenting the parameters of a function or method. This page covers both `@param` and `@this`.

## Signature / Usage

```
@param paramName - description
```

```
@param paramName.propertyName - description
```

```
@this TypeName
```

### @param (block tag)

Documents the parameters of a function or method. Conforms to the TSDoc specification.

**Basic usage**: write `@param name - description` to record the parameter name and description.

**Object literal support**: for object-typed parameters, dot notation (e.g. `@param options.value`) can be used to document nested properties. Only one level of nesting is supported.

**Destructured parameters**: TypeDoc automatically infers destructured parameter names from `@param` tags. All parameters must be documented for the inference to succeed; otherwise the parameter is displayed as `__namedParameters`.

**JSDoc compatibility**: TypeDoc supports flexible syntax variants for improved compatibility. All of the following are treated identically, regardless of whether a type annotation or hyphen separator is present:

- `@param test - description`
- `@param test description`
- `@param {string} test - description`
- `@param {string} test description`

### @this (block tag)

Specifies the type of `this` for a function that uses `this` in JavaScript. TypeDoc incorporates this information into the parameter description.

```typescript
/**
 * @param a - the first number
 * @param b - the second number
 */
export function sum(a: number, b: number): number;
```

```typescript
/**
 * @param options - Configuration options
 * @param options.value - The value to set
 * @param options.name - The name to use
 */
export function configure(options: { value: number; name: string }): void;
```

```typescript
/**
 * @param value - The value
 * @param name - The name
 */
export function configure({ value, name }: { value: number; name: string }): void;
```

```javascript
/**
 * @this {Response}
 * @param {Request} req
 */
function handler(req) {
    this.send("OK");
}
```

## Notes

- Dot notation for object properties is only supported for one level of nesting
- Automatic inference of destructured parameters requires all parameters to be documented
- TypeDoc supports flexible, JSDoc-compatible syntax
- `@this` is used primarily in JavaScript projects

## Related

- [@returns](./returns.md) -- documenting return values
- [@typeParam](./typeParam.md) -- documenting type parameters
- [@expand](./expand.md) -- controlling expansion of parameter types
- [TSDoc @param](https://tsdoc.org/pages/tags/param/)
