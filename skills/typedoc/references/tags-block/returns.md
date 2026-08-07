# @returns / @return

Block tag for documenting the return value of a function.

## Signature / Usage

```
@returns description of the return value
```

or

```
@return description of the return value
```

The `@returns` tag is used to document the return value of a function. Conforms to the TSDoc specification.

TypeDoc recognizes `@return` as an equivalent alias of `@returns`.

At most one `@returns` tag should be included per comment.

```typescript
/**
 * @param a - the first number
 * @param b - the second number
 * @returns The sum of `a` and `b`
 */
export function sum(a: number, b: number): number;
```

## Notes

- At most one `@returns` tag should be used per comment
- `@returns` and `@return` behave identically
- The TSDoc specification recommends `@returns`

## Related

- [@param](./param.md) -- documenting parameters
- [TSDoc @returns](https://tsdoc.org/pages/tags/returns/)
