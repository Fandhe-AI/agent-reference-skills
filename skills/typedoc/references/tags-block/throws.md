# @throws

Block tag for documenting exceptions that a function or method may throw.

## Signature / Usage

```
@throws description of the exception
```

```
@throws {@link ErrorType} description of the condition
```

The `@throws` tag is used to document exceptions that may be raised from a function or method. Conforms to the TSDoc specification.

The `{@link}` syntax can be used to reference the error type, along with a description of the condition under which it is thrown.

```typescript
/**
 * @throws {@link UserError} if `max < min`
 */
export function rand(min: number, max: number): number;
```

## Notes

- The `{@link}` syntax can be used to reference an error type
- Multiple `@throws` tags can be included in a single comment
- Including a description of the condition under which the exception occurs is recommended

## Related

- [@returns](./returns.md) -- documenting return values
- [@param](./param.md) -- documenting parameters
- [TSDoc @throws](https://tsdoc.org/pages/tags/throws/)
